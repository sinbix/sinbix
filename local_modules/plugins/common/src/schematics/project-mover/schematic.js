"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("./utils");
function default_1(options) {
    const normalizedOptions = utils_1.normalizeOptions(options);
    return schematics_1.chain([
        utils_1.moveProject(normalizedOptions),
        utils_1.updateProjectRootFiles(normalizedOptions),
        utils_1.updateImports(normalizedOptions),
        utils_1.updateProjectConfig(normalizedOptions),
    ]);
}
exports.default = default_1;
//# sourceMappingURL=schematic.js.map