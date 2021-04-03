"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeProject = void 0;
const schematics_1 = require("@angular-devkit/schematics");
function nodeProject(options) {
    return schematics_1.chain([
        schematics_1.externalSchematic('@sinbix/node', 'project', {
            name: options.projectRoot,
            directory: '',
            tags: [...options.projectTags].join(','),
            type: 'application',
            sourceRoot: 'src',
        }),
    ]);
}
exports.nodeProject = nodeProject;
//# sourceMappingURL=node-project.js.map