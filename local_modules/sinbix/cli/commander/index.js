"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commander_1 = require("../src/commander");
const argv = require('yargs-parser')(process.argv.slice(2));
(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield commander_1.invokeCli(argv.sinbixWorkspaceRoot || process.cwd(), process.argv.slice(2));
}))();
//# sourceMappingURL=index.js.map