"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProjectToWorkspace = void 0;
const utils_1 = require("@sinbix/core/plugin-utils");
function addProjectToWorkspace(options) {
    return utils_1.updateWorkspaceInTree((workspace) => {
        workspace.projects[options.projectName] = {
            root: options.projectRoot,
            sourceRoot: options.sourceRoot
                ? `${options.projectRoot}/${options.sourceRoot}`
                : undefined,
            projectType: options.type,
            architect: {},
        };
        return workspace;
    });
}
exports.addProjectToWorkspace = addProjectToWorkspace;
//# sourceMappingURL=add-project-to-workspace.js.map