"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePlugin = void 0;
const utils_1 = require("@sinbix/core/plugin-utils");
const schematics_1 = require("@angular-devkit/schematics");
function validatePlugin(host, options) {
    const project = utils_1.getProjectConfig(host, options.pluginName);
    if (!project) {
        throw new schematics_1.SchematicsException(`Project name "${options.pluginName}" doesn't not exist.`);
    }
}
exports.validatePlugin = validatePlugin;
//# sourceMappingURL=validate-plugin.js.map