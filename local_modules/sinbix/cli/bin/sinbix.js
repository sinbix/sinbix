#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
Symbol.observable = Symbol('observable polyfill');
const chalk_1 = require("chalk");
const bin_1 = require("../src/bin");
(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const workspace = bin_1.findWorkspaceRoot(process.cwd());
    let localCli;
    if (workspace) {
        try {
            localCli = require.resolve('@sinbix/cli/bin/sinbix.js', {
                paths: [workspace],
            });
        }
        catch (e) {
            bin_1.output.error({
                title: `Could not find Sinbix modules in this workspace.`,
                bodyLines: [`Have you run ${chalk_1.default.bold.white(`npm install`)}?`],
            });
            process.exit(1);
        }
    }
    const sinbixCli = require.resolve('@sinbix/cli/bin/sinbix.js');
    if (sinbixCli === localCli) {
        yield bin_1.initLocal(workspace);
    }
    else {
        if (localCli) {
            yield Promise.resolve().then(() => require(localCli));
        }
        else {
            yield bin_1.initGlobal();
        }
    }
}))();
//# sourceMappingURL=sinbix.js.map