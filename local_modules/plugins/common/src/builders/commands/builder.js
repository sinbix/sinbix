"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBuilder = exports.LARGE_BUFFER = void 0;
const tslib_1 = require("tslib");
const architect_1 = require("@angular-devkit/architect");
const child_process_1 = require("child_process");
const yargsParser = require("yargs-parser");
exports.LARGE_BUFFER = 1024 * 1000000;
const propKeys = [
    'command',
    'commands',
    'color',
    'parallel',
    'readyWhen',
    'cwd',
    'args',
    'envFile',
    'outputPath',
];
function runInParallel(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const proc = options.commands.map((c) => createProcess(c.command, options.readyWhen, options.color, options.cwd).then((result) => ({
            result,
            command: c.command,
        })));
        if (options.readyWhen) {
            const r = yield Promise.race(proc);
            if (!r.result) {
                process.stderr.write(`Warning: @nrwl/run-commands command "${r.command}" exited with non-zero status code`);
                return false;
            }
            else {
                return true;
            }
        }
        else {
            const r = yield Promise.all(proc);
            const failed = r.filter((v) => !v.result);
            if (failed.length > 0) {
                failed.forEach((f) => {
                    process.stderr.write(`Warning: @nrwl/run-commands command "${f.command}" exited with non-zero status code`);
                });
                return false;
            }
            else {
                return true;
            }
        }
    });
}
function normalizeOptions(options) {
    options.parsedArgs = parseArgs(options);
    if (options.command) {
        options.commands = [{ command: options.command }];
        options.parallel = false;
    }
    else {
        options.commands = options.commands.map((c) => typeof c === 'string' ? { command: c } : c);
    }
    options.commands.forEach((c) => {
        var _a;
        c.command = transformCommand(c.command, options.parsedArgs, (_a = c.forwardAllArgs) !== null && _a !== void 0 ? _a : true);
    });
    return options;
}
function runSerially(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        options.commands.forEach((c) => {
            createSyncProcess(c.command, options.color, options.cwd);
        });
        return true;
    });
}
function createProcess(command, readyWhen, color, cwd) {
    return new Promise((res) => {
        const childProcess = child_process_1.exec(command, {
            maxBuffer: exports.LARGE_BUFFER,
            env: processEnv(color),
            cwd,
        });
        /**
         * Ensure the child process is killed when the parent exits
         */
        process.on('exit', () => childProcess.kill());
        childProcess.stdout.on('data', (data) => {
            process.stdout.write(data);
            if (readyWhen && data.toString().indexOf(readyWhen) > -1) {
                res(true);
            }
        });
        childProcess.stderr.on('data', (err) => {
            process.stderr.write(err);
            if (readyWhen && err.toString().indexOf(readyWhen) > -1) {
                res(true);
            }
        });
        childProcess.on('close', (code) => {
            if (!readyWhen) {
                res(code === 0);
            }
        });
    });
}
function createSyncProcess(command, color, cwd) {
    child_process_1.execSync(command, {
        env: processEnv(color),
        stdio: [0, 1, 2],
        maxBuffer: exports.LARGE_BUFFER,
        cwd,
    });
}
function processEnv(color) {
    const env = Object.assign({}, process.env);
    if (color) {
        env.FORCE_COLOR = `${color}`;
    }
    return env;
}
function transformCommand(command, args, forwardAllArgs) {
    if (command.indexOf('{args.') > -1) {
        const regex = /{args\.([^}]+)}/g;
        return command.replace(regex, (_, group) => args[group]);
    }
    else if (Object.keys(args).length > 0 && forwardAllArgs) {
        const stringifyArgs = Object.keys(args)
            .map((a) => `--${a}=${args[a]}`)
            .join(' ');
        return `${command} ${stringifyArgs}`;
    }
    else {
        return command;
    }
}
function parseArgs(options) {
    const args = options.args;
    if (!args) {
        return Object.keys(options)
            .filter((p) => propKeys.indexOf(p) === -1)
            .reduce((m, c) => ((m[c] = options[c]), m), {});
    }
    return args
        .split(' ')
        .map((t) => t.trim())
        .reduce((m, c) => {
        if (!c.startsWith('--')) {
            throw new Error(`Invalid args: ${args}`);
        }
        const [key, value] = c.substring(2).split('=');
        if (!key || !value) {
            throw new Error(`Invalid args: ${args}`);
        }
        m[key] = value;
        return m;
    }, {});
}
function loadEnvVars(path) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (path) {
            const result = (yield Promise.resolve().then(() => require('dotenv'))).config({ path });
            if (result.error) {
                throw result.error;
            }
        }
        else {
            try {
                (yield Promise.resolve().then(() => require('dotenv'))).config();
            }
            catch (e) { }
        }
    });
}
function runBuilder(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // Special handling of extra options coming through Angular CLI
        if (options['--']) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const _a = yargsParser(options['--'], {
                configuration: { 'camel-case-expansion': false },
            }), { _ } = _a, overrides = tslib_1.__rest(_a, ["_"]);
            options = Object.assign(Object.assign({}, options), overrides);
            delete options['--'];
        }
        yield loadEnvVars(options.envFile);
        const normalized = normalizeOptions(options);
        if (options.readyWhen && !options.parallel) {
            throw new Error('ERROR: Bad builder config for @nrwl/run-commands - "readyWhen" can only be used when parallel=true');
        }
        try {
            const success = options.parallel
                ? yield runInParallel(normalized)
                : yield runSerially(normalized);
            return { success };
        }
        catch (e) {
            throw new Error(`ERROR: Something went wrong in @sinbix/commands - ${e.message}`);
        }
    });
}
exports.runBuilder = runBuilder;
//@ts-ignore
exports.default = architect_1.createBuilder(runBuilder);
//# sourceMappingURL=builder.js.map