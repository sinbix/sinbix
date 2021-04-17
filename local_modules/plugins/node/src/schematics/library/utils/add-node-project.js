"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNodeProject = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("@sinbix/core/plugin-utils");
function addNodeProject(options) {
    return schematics_1.externalSchematic('@sinbix/node', 'project', {
        name: options.projectRoot,
        directory: '',
        tags: options.projectTags.join(','),
        type: utils_1.ProjectType.Library,
        testEnvironment: options.testEnvironment,
    });
}
exports.addNodeProject = addNodeProject;
//# sourceMappingURL=add-node-project.js.map