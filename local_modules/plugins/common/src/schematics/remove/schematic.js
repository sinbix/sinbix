"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
const utils_1 = require("./utils");
function default_1(options) {
    const normalizedOptions = utils_1.normalizeOptions(options);
    return schematics_1.chain([
        plugin_utils_1.checkProjectExists(normalizedOptions),
        utils_1.checkDependencies(normalizedOptions),
        utils_1.checkTargets(normalizedOptions),
        utils_1.removeProject(normalizedOptions),
        utils_1.updateSinbixJson(normalizedOptions),
        utils_1.updateTsconfig(normalizedOptions),
        utils_1.updateWorkspace(normalizedOptions),
        plugin_utils_1.formatFiles(normalizedOptions),
    ]);
}
exports.default = default_1;
//# sourceMappingURL=schematic.js.map