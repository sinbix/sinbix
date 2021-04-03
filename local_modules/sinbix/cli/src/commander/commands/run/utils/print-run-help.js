"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printRunHelp = void 0;
const utils_1 = require("../../../utils");
function printRunHelp(opts, schema, logger) {
    utils_1.printHelp(`${utils_1.commandName} run ${opts.project}:${opts.target}`, schema, logger);
}
exports.printRunHelp = printRunHelp;
//# sourceMappingURL=print-run-help.js.map