"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectConfig = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("@sinbix/utils");
function updateProjectConfig(options) {
    return schematics_1.chain([updateWorkspace(options), updateSinbixConfig(options)]);
}
exports.updateProjectConfig = updateProjectConfig;
function updateWorkspace(options) {
    return utils_1.updateWorkspaceInTree((workspace) => {
        const project = workspace.projects[options.projectName];
        const newProjectName = utils_1.getNewProjectName(options.destination);
        // update root path refs in that project only
        const oldProject = JSON.stringify(project);
        const newProject = oldProject.replace(new RegExp(project.root, 'g'), utils_1.getDestination(options.destination));
        // rename
        delete workspace.projects[options.projectName];
        workspace.projects[newProjectName] = JSON.parse(newProject);
        // update target refs
        const strWorkspace = JSON.stringify(workspace);
        workspace = JSON.parse(strWorkspace.replace(new RegExp(`${options.projectName}:`, 'g'), `${newProjectName}:`));
        // update default project (if necessary)
        if (workspace.defaultProject &&
            workspace.defaultProject === options.projectName) {
            workspace.defaultProject = newProjectName;
        }
        return workspace;
    });
}
function updateSinbixConfig(options) {
    return utils_1.updateJsonInTree('sinbix.json', (json) => {
        Object.values(json.projects).forEach((project) => {
            if (project.implicitDependencies) {
                const index = project.implicitDependencies.indexOf(options.projectName);
                if (index !== -1) {
                    project.implicitDependencies[index] = utils_1.getNewProjectName(options.destination);
                }
            }
        });
        json.projects[utils_1.getNewProjectName(options.destination)] = Object.assign({}, json.projects[options.projectName]);
        delete json.projects[options.projectName];
        return json;
    });
}
//# sourceMappingURL=update-project-config.js.map