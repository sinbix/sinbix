"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGlobal = exports.initLocal = void 0;
const tslib_1 = require("tslib");
const path = require("path");
const fs = require("fs");
const parse_run_one_options_1 = require("./parse-run-one-options");
function initLocal(workspace) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield Promise.resolve().then(() => require('@sinbix/core/utils/perf-logging'));
        const supportedSinbixCommands = (yield Promise.resolve().then(() => require('@sinbix/core/command-line/supported-sinbix-commands'))).supportedSinbixCommands;
        const runOpts = runOneOptions(workspace);
        if (supportedSinbixCommands.includes(process.argv[2])) {
            (yield Promise.resolve().then(() => require('@sinbix/core/command-line/sinbix-commands'))).commandsObject
                .argv;
        }
        else {
            if (runOpts === false || process.env.SINBIX_SKIP_TASKS_RUNNER) {
                if (workspace && process.argv[2] === 'update') {
                    console.log(`Sinbix provides a much improved version of "ng update". It runs the same migrations, but allows you to:`);
                    console.log(`- rerun the same migration multiple times`);
                    console.log(`- reorder migrations`);
                    console.log(`- skip migrations`);
                    console.log(`- fix migrations that "almost work"`);
                    console.log(`- commit a partially migrated state`);
                    console.log(`- change versions of packages to match org requirements`);
                    console.log(`And, in general, it is lot more reliable for non-trivial workspaces. Read more at: https://sinbix.dev/latest/angular/workspace/update`);
                    console.log(`Run "Sinbix migrate latest" to update to the latest version of Sinbix.`);
                }
                else {
                    yield loadCli(workspace);
                }
            }
            else {
                yield (yield Promise.resolve().then(() => require('@sinbix/core/command-line/run-one'))).runOne(runOpts);
            }
        }
    });
}
exports.initLocal = initLocal;
function initGlobal() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield Promise.resolve().then(() => require('../../commander'));
    });
}
exports.initGlobal = initGlobal;
function loadCli(workspace) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let cliPath;
        if (workspace) {
            cliPath = '../../commander';
        }
        else {
            console.error(`Cannot recognize the workspace type.`);
            process.exit(1);
        }
        try {
            yield Promise.resolve().then(() => require(cliPath));
        }
        catch (e) {
            console.error(`Could not find ${cliPath} module in this workspace.`, e);
            process.exit(1);
        }
    });
}
function runOneOptions(workspace) {
    try {
        const sinbixJson = JSON.parse(fs.readFileSync(path.join(workspace, 'sinbix.json')).toString());
        const workspaceConfigJson = JSON.parse(fs
            .readFileSync(path.join(workspace, 'angular.json'))
            .toString());
        return parse_run_one_options_1.parseRunOneOptions(sinbixJson, workspaceConfigJson, process.argv.slice(2));
    }
    catch (e) {
        return false;
    }
}
//# sourceMappingURL=init.js.map