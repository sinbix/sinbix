"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("./utils");
function default_1(options) {
    if (!options.name) {
        throw new Error(`Invalid options, "name" is required.`);
    }
    return schematics_1.chain([utils_1.addFiles(options)]);
}
exports.default = default_1;
//# sourceMappingURL=schematic.js.map