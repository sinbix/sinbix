"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskOrchestrator = void 0;
const tslib_1 = require("tslib");
const cache_1 = require("./cache");
const file_utils_1 = require("../file-utils");
const tasks_runner_1 = require("./tasks-runner");
const utils_1 = require("./utils");
const child_process_1 = require("child_process");
const output_1 = require("../utils/output");
const fs = require("fs");
const app_root_1 = require("../utils/app-root");
const dotenv = require("dotenv");
class TaskOrchestrator {
    constructor(initiatingProject, projectGraph, options) {
        this.initiatingProject = initiatingProject;
        this.projectGraph = projectGraph;
        this.options = options;
        this.workspaceRoot = app_root_1.appRootPath;
        this.cache = new cache_1.Cache(this.options);
        this.cli = file_utils_1.cliCommand();
        this.processes = [];
        this.setupOnProcessExitListener();
    }
    run(tasksInStage) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { cached, rest } = yield this.splitTasksIntoCachedAndNotCached(tasksInStage);
            const r1 = yield this.applyCachedResults(cached);
            const r2 = yield this.runRest(rest);
            this.cache.removeOldCacheRecords();
            return [...r1, ...r2];
        });
    }
    runRest(tasks) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const left = [...tasks];
            const res = [];
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const that = this;
            function takeFromQueue() {
                if (left.length > 0) {
                    const task = left.pop();
                    const p = that.pipeOutputCapture(task)
                        ? that.forkProcessPipeOutputCapture(task)
                        : that.forkProcessDirectOutputCapture(task);
                    return p
                        .then((code) => {
                        res.push({
                            task,
                            success: code === 0,
                            type: tasks_runner_1.AffectedEventType.TaskComplete,
                        });
                    })
                        .then(takeFromQueue)
                        .catch(takeFromQueue);
                }
                else {
                    return Promise.resolve(null);
                }
            }
            const wait = [];
            // initial seeding
            const maxParallel = this.options.parallel
                ? this.options.maxParallel || 3
                : 1;
            for (let i = 0; i < maxParallel; ++i) {
                wait.push(takeFromQueue());
            }
            yield Promise.all(wait);
            return res;
        });
    }
    splitTasksIntoCachedAndNotCached(tasks) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.options.skipSinbixCache || this.options.skipSinbixCache === undefined) {
                return { cached: [], rest: tasks };
            }
            else {
                const cached = [];
                const rest = [];
                yield Promise.all(tasks.map((task) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const cachedResult = yield this.cache.get(task);
                    if (cachedResult) {
                        cached.push({ task, cachedResult });
                    }
                    else {
                        rest.push(task);
                    }
                })));
                return { cached, rest };
            }
        });
    }
    applyCachedResults(tasks) {
        tasks.forEach((t) => {
            this.options.lifeCycle.startTask(t.task);
            if (!this.initiatingProject ||
                this.initiatingProject === t.task.target.project) {
                const args = this.getCommandArgs(t.task);
                output_1.output.logCommand(`${this.cli} ${args.join(' ')}`);
                output_1.output.note({ title: `Cached Output:` });
                process.stdout.write(t.cachedResult.terminalOutput);
            }
            const outputs = utils_1.getOutputs(this.projectGraph.nodes, t.task);
            this.cache.copyFilesFromCache(t.cachedResult, outputs);
            this.options.lifeCycle.endTask(t.task, 0);
        });
        return tasks.reduce((m, c) => {
            m.push({
                task: c.task,
                type: tasks_runner_1.AffectedEventType.TaskCacheRead,
                success: true,
            });
            return m;
        }, []);
    }
    pipeOutputCapture(task) {
        try {
            const p = this.projectGraph.nodes[task.target.project];
            const b = p.data.architect[task.target.target].builder;
            // this is temporary. we simply want to assess if pipeOutputCapture
            // works well before making it configurable
            return (this.cache.temporaryOutputPath(task) &&
                (b === '@sinbix/common:commands' ||
                    b === '@sinbix/cypress:cypress' ||
                    b === '@sinbix/gatsby:build'));
        }
        catch (e) {
            return false;
        }
    }
    forkProcessPipeOutputCapture(task) {
        const taskOutputs = utils_1.getOutputs(this.projectGraph.nodes, task);
        const outputPath = this.cache.temporaryOutputPath(task);
        return new Promise((res, rej) => {
            try {
                this.options.lifeCycle.startTask(task);
                const forwardOutput = this.shouldForwardOutput(outputPath, task);
                const env = this.envForForkedProcess(task, undefined, forwardOutput, process.env.FORCE_COLOR === undefined
                    ? 'true'
                    : process.env.FORCE_COLOR);
                const args = this.getCommandArgs(task);
                const commandLine = `${this.cli} ${args.join(' ')}`;
                if (forwardOutput) {
                    output_1.output.logCommand(commandLine);
                }
                const p = child_process_1.fork(this.getCommand(), args, {
                    stdio: ['inherit', 'pipe', 'pipe', 'ipc'],
                    env,
                });
                this.processes.push(p);
                const out = [];
                const outWithErr = [];
                p.stdout.on('data', (chunk) => {
                    process.stdout.write(chunk);
                    out.push(chunk.toString());
                    outWithErr.push(chunk.toString());
                });
                p.stderr.on('data', (chunk) => {
                    process.stderr.write(chunk);
                    outWithErr.push(chunk.toString());
                });
                p.on('exit', (code) => {
                    if (code === null)
                        code = 2;
                    // we didn't print any output as we were running the command
                    // print all the collected output|
                    if (!forwardOutput) {
                        output_1.output.logCommand(commandLine);
                        process.stdout.write(outWithErr.join(''));
                    }
                    if (outputPath) {
                        fs.writeFileSync(outputPath, outWithErr.join(''));
                        if (code === 0) {
                            this.cache
                                .put(task, outputPath, taskOutputs)
                                .then(() => {
                                this.options.lifeCycle.endTask(task, code);
                                res(code);
                            })
                                .catch((e) => {
                                rej(e);
                            });
                        }
                        else {
                            this.options.lifeCycle.endTask(task, code);
                            res(code);
                        }
                    }
                    else {
                        this.options.lifeCycle.endTask(task, code);
                        res(code);
                    }
                });
            }
            catch (e) {
                console.error(e);
                rej(e);
            }
        });
    }
    forkProcessDirectOutputCapture(task) {
        const taskOutputs = utils_1.getOutputs(this.projectGraph.nodes, task);
        const outputPath = this.cache.temporaryOutputPath(task);
        return new Promise((res, rej) => {
            try {
                this.options.lifeCycle.startTask(task);
                const forwardOutput = this.shouldForwardOutput(outputPath, task);
                const env = this.envForForkedProcess(task, outputPath, forwardOutput, undefined);
                const args = this.getCommandArgs(task);
                const commandLine = `${this.cli} ${args.join(' ')}`;
                if (forwardOutput) {
                    output_1.output.logCommand(commandLine);
                }
                const p = child_process_1.fork(this.getCommand(), args, {
                    stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
                    env,
                });
                this.processes.push(p);
                p.on('exit', (code) => {
                    if (code === null)
                        code = 2;
                    // we didn't print any output as we were running the command
                    // print all the collected output|
                    if (!forwardOutput) {
                        output_1.output.logCommand(commandLine);
                        try {
                            process.stdout.write(fs.readFileSync(outputPath));
                        }
                        catch (e) {
                            console.error(`Sinbix could not find process's output. Run the command without --parallel.`);
                        }
                    }
                    // we don't have to worry about this statement. code === 0 guarantees the file is there.
                    if (outputPath && code === 0) {
                        this.cache
                            .put(task, outputPath, taskOutputs)
                            .then(() => {
                            this.options.lifeCycle.endTask(task, code);
                            res(code);
                        })
                            .catch((e) => {
                            rej(e);
                        });
                    }
                    else {
                        this.options.lifeCycle.endTask(task, code);
                        res(code);
                    }
                });
            }
            catch (e) {
                console.error(e);
                rej(e);
            }
        });
    }
    envForForkedProcess(task, outputPath, forwardOutput, forceColor) {
        const envsFromFiles = Object.assign(Object.assign(Object.assign(Object.assign({}, parseEnv('.env')), parseEnv('.local.env')), parseEnv(`${task.projectRoot}/.env`)), parseEnv(`${task.projectRoot}/.local.env`));
        const env = Object.assign(Object.assign(Object.assign({}, envsFromFiles), { FORCE_COLOR: forceColor, SINBIX_INVOKED_BY_RUNNER: 'true' }), process.env);
        if (outputPath) {
            env.SINBIX_TERMINAL_OUTPUT_PATH = outputPath;
            if (this.options.captureStderr) {
                env.SINBIX_TERMINAL_CAPTURE_STDERR = 'true';
            }
            // TODO: remove this once we have a reasonable way to configure it
            if (task.target.target === 'test') {
                env.SINBIX_TERMINAL_CAPTURE_STDERR = 'true';
            }
            if (forwardOutput) {
                env.SINBIX_FORWARD_OUTPUT = 'true';
            }
        }
        return env;
    }
    shouldForwardOutput(outputPath, task) {
        if (!outputPath)
            return true;
        if (!this.options.parallel)
            return true;
        if (task.target.project === this.initiatingProject)
            return true;
        return false;
    }
    getCommand() {
        const cli = require.resolve(`@sinbix/cli/commander`, {
            paths: [this.workspaceRoot],
        });
        return `${cli}`;
    }
    getCommandArgs(task) {
        const args = utils_1.unparse(task.overrides || {});
        const config = task.target.configuration
            ? `:${task.target.configuration}`
            : '';
        return [
            'run',
            `${task.target.project}:${task.target.target}${config}`,
            ...args,
        ];
    }
    setupOnProcessExitListener() {
        // Forward SIGINTs to all forked processes
        process.addListener('SIGINT', () => {
            this.processes.forEach((p) => {
                p.kill('SIGINT');
            });
            process.exit();
        });
    }
}
exports.TaskOrchestrator = TaskOrchestrator;
function parseEnv(path) {
    try {
        const envContents = fs.readFileSync(path);
        return dotenv.parse(envContents);
    }
    catch (e) { }
}
//# sourceMappingURL=task-orchestrator.js.map