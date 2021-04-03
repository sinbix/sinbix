"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTargets = void 0;
const utils_1 = require("@sinbix/utils");
function checkTargets(options) {
    if (options.forceRemove) {
        return (tree) => tree;
    }
    return utils_1.updateWorkspaceInTree((workspace) => {
        const findTarget = new RegExp(`${options.projectName}:`);
        const usedIn = [];
        for (const name of Object.keys(workspace.projects)) {
            if (name === options.projectName) {
                continue;
            }
            const projectStr = JSON.stringify(workspace.projects[name]);
            if (findTarget.test(projectStr)) {
                usedIn.push(name);
            }
        }
        if (usedIn.length > 0) {
            let message = `${options.projectName} is still targeted by the following projects:\n\n`;
            for (let project of usedIn) {
                message += `${project}\n`;
            }
            throw new Error(message);
        }
        return workspace;
    });
}
exports.checkTargets = checkTargets;
//# sourceMappingURL=check-targets.js.map