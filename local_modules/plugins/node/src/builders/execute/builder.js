"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBuilder = void 0;
const architect_1 = require("@angular-devkit/architect");
const child_process_1 = require("child_process");
const treeKill = require("tree-kill");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const literals_1 = require("@angular-devkit/core/src/utils/literals");
function runBuilder(options, context) {
    return runWaitUntilTargets(options, context).pipe(operators_1.concatMap((v) => {
        if (!v.success) {
            context.logger.error(`One of the tasks specified in waitUntilTargets failed`);
            return rxjs_1.of({ success: false });
        }
        return startBuild(options, context).pipe(operators_1.concatMap((event) => {
            if (!event.success) {
                context.logger.error('There was an error with the build. See above.');
                context.logger.info(`${event.outfile} was not restarted.`);
            }
            return handleBuildEvent(event, options, context).pipe(operators_1.mapTo(event));
        }));
    }));
}
exports.runBuilder = runBuilder;
exports.default = architect_1.createBuilder(runBuilder);
let subProcess = null;
function runProcess(event, options) {
    if (subProcess || !event.success)
        return;
    subProcess = child_process_1.fork(event.outfile, options.args, {
        execArgv: getExecArgv(options),
    });
}
function getExecArgv(options) {
    const args = ['-r', 'source-map-support/register', ...options.runtimeArgs];
    if (options.inspect === true) {
        options.inspect = "inspect" /* Inspect */;
    }
    if (options.inspect) {
        args.push(`--${options.inspect}=${options.host}:${options.port}`);
    }
    return args;
}
function handleBuildEvent(event, options, context) {
    return rxjs_1.iif(() => !event.success || options.watch, killProcess(context), rxjs_1.of(undefined)).pipe(operators_1.tap(() => runProcess(event, options)));
}
function killProcess(context) {
    if (!subProcess) {
        return rxjs_1.of(undefined);
    }
    const observableTreeKill = rxjs_1.bindCallback(treeKill);
    return observableTreeKill(subProcess.pid, 'SIGTERM').pipe(operators_1.tap((err) => {
        subProcess = null;
        if (err) {
            if (Array.isArray(err) && err[0] && err[2]) {
                const errorMessage = err[2];
                context.logger.error(errorMessage);
            }
            else if (err.message) {
                context.logger.error(err.message);
            }
        }
    }));
}
function startBuild(options, context) {
    const target = architect_1.targetFromTargetString(options.buildTarget);
    return rxjs_1.from(Promise.all([
        context.getTargetOptions(target),
        context.getBuilderNameForTarget(target),
    ]).then(([options, builderName]) => context.validateOptions(options, builderName))).pipe(operators_1.tap((options) => {
        if (options.optimization) {
            context.logger.warn(literals_1.stripIndents `
            ************************************************
            This is a simple process manager for use in
            testing or debugging Node applications locally.
            DO NOT USE IT FOR PRODUCTION!
            You should look into proper means of deploying
            your node application to production.
            ************************************************`);
        }
    }), operators_1.concatMap((options) => 
    //@ts-ignore
    architect_1.scheduleTargetAndForget(context, target, Object.assign(Object.assign({}, options), { watch: true }))));
}
function runWaitUntilTargets(options, context) {
    if (!options.waitUntilTargets || options.waitUntilTargets.length === 0)
        return rxjs_1.of({ success: true });
    return rxjs_1.zip(...options.waitUntilTargets.map((b) => {
        return architect_1.scheduleTargetAndForget(context, architect_1.targetFromTargetString(b)).pipe(
        //@ts-ignore
        operators_1.filter((e) => e.success !== undefined), operators_1.first());
    })).pipe(operators_1.map((results) => {
        return { success: !results.some((r) => !r.success) };
    }));
}
//# sourceMappingURL=builder.js.map