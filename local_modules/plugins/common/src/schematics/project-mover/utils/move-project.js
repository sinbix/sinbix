"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveProject = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
const utils_1 = require("../../../utils");
function moveProject(options) {
    return (host) => {
        const project = plugin_utils_1.getProjectConfig(host, options.projectName);
        return schematics_1.chain([copyProject(options), utils_1.cleanDelete(project.root)]);
    };
}
exports.moveProject = moveProject;
function copyProject(options) {
    return (host) => {
        const project = plugin_utils_1.getProjectConfig(host, options.projectName);
        const destination = plugin_utils_1.getDestination(options.destination);
        const dir = host.getDir(project.root);
        dir.visit((file) => {
            const newPath = file.replace(project.root, destination);
            host.create(newPath, host.read(file));
        });
    };
}
//# sourceMappingURL=move-project.js.map