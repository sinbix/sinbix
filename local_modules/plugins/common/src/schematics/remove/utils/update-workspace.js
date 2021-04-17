"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkspace = void 0;
const utils_1 = require("@sinbix/core/plugin-utils");
function updateWorkspace(options) {
    return utils_1.updateWorkspaceInTree((workspace, context, host) => {
        delete workspace.projects[options.projectName];
        if (workspace.defaultProject &&
            workspace.defaultProject === options.projectName) {
            delete workspace.defaultProject;
            const workspacePath = utils_1.getWorkspacePath(host);
            context.logger.warn(`Default project was removed in ${workspacePath} because it was "${options.projectName}". If you want a default project you should define a new one.`);
        }
        return workspace;
    });
}
exports.updateWorkspace = updateWorkspace;
//# sourceMappingURL=update-workspace.js.map