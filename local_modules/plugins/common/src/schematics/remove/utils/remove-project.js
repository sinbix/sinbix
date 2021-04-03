"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProject = void 0;
const utils_1 = require("@sinbix/utils");
const utils_2 = require("../../../utils");
function removeProject(options) {
    return (host) => {
        return utils_2.cleanDelete(utils_1.getProjectConfig(host, options.projectName).root);
    };
}
exports.removeProject = removeProject;
//# sourceMappingURL=remove-project.js.map