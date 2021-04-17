"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("@sinbix/core/plugin-utils");
const utils_2 = require("./utils");
function default_1(options) {
    const normalizedOptions = utils_2.normalizeOptions(options);
    return schematics_1.chain([
        utils_1.checkProjectExists(normalizedOptions),
        utils_2.checkDependencies(normalizedOptions),
        utils_2.checkTargets(normalizedOptions),
        utils_2.removeProject(normalizedOptions),
        utils_2.updateSinbixJson(normalizedOptions),
        utils_2.updateTsconfig(normalizedOptions),
        utils_2.updateWorkspace(normalizedOptions),
        utils_1.formatFiles(normalizedOptions),
    ]);
}
exports.default = default_1;
//# sourceMappingURL=schematic.js.map