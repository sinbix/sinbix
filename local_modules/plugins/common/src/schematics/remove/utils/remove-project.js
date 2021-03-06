"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProject = void 0;
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
const utils_1 = require("../../../utils");
function removeProject(options) {
    return (host) => {
        return utils_1.cleanDelete(plugin_utils_1.getProjectConfig(host, options.projectName).root);
    };
}
exports.removeProject = removeProject;
//# sourceMappingURL=remove-project.js.map