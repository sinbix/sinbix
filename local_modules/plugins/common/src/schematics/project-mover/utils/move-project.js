"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveProject = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("@sinbix/utils");
const utils_2 = require("../../../utils");
function moveProject(options) {
    return (host) => {
        const project = utils_1.getProjectConfig(host, options.projectName);
        return schematics_1.chain([copyProject(options), utils_2.cleanDelete(project.root)]);
    };
}
exports.moveProject = moveProject;
function copyProject(options) {
    return (host) => {
        const project = utils_1.getProjectConfig(host, options.projectName);
        const destination = utils_1.getDestination(options.destination);
        const dir = host.getDir(project.root);
        dir.visit((file) => {
            const newPath = file.replace(project.root, destination);
            host.create(newPath, host.read(file));
        });
    };
}
//# sourceMappingURL=move-project.js.map