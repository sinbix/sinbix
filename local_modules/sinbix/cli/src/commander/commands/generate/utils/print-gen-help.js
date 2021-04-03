"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printGenHelp = void 0;
const utils_1 = require("../../../utils");
function printGenHelp(opts, schema, logger) {
    utils_1.printHelp(`${utils_1.commandName} generate ${opts.collectionName}:${opts.schematicName}`, Object.assign(Object.assign({}, schema), { properties: Object.assign(Object.assign({}, schema.properties), { dryRun: {
                type: 'boolean',
                default: false,
                description: `Runs through and reports activity without writing to disk.`,
            } }) }), logger);
}
exports.printGenHelp = printGenHelp;
//# sourceMappingURL=print-gen-help.js.map