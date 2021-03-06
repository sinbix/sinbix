"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectRootFiles = void 0;
const app_root_1 = require("@sinbix/core/utils/app-root");
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
const plugin_utils_2 = require("@sinbix/core/plugin-utils");
const path = require("path");
/**
 * Updates the files in the root of the project
 *
 * Typically these are config files which point outside of the project folder
 *
 * @param options The options provided to the schematic
 */
function updateProjectRootFiles(options) {
    return (host) => {
        const project = plugin_utils_1.getProjectConfig(host, options.projectName);
        const destination = plugin_utils_2.getDestination(options.destination);
        const newRelativeRoot = path
            .relative(path.join(app_root_1.appRootPath, destination), app_root_1.appRootPath)
            .split(path.sep)
            .join('/');
        const oldRelativeRoot = path
            .relative(path.join(app_root_1.appRootPath, project.root), app_root_1.appRootPath)
            .split(path.sep)
            .join('/');
        if (newRelativeRoot === oldRelativeRoot) {
            return;
        }
        const dots = /\./g;
        const regex = new RegExp(oldRelativeRoot.replace(dots, '\\.'), 'g');
        const isRootFile = new RegExp(`${options.destination}/[^/]+.js*`);
        const projectDir = host.getDir(destination);
        projectDir.visit((file) => {
            if (!isRootFile.test(file)) {
                return;
            }
            const oldContent = host.read(file).toString();
            const newContent = oldContent.replace(regex, newRelativeRoot);
            host.overwrite(file, newContent);
        });
    };
}
exports.updateProjectRootFiles = updateProjectRootFiles;
//# sourceMappingURL=update-project-root-files.js.map