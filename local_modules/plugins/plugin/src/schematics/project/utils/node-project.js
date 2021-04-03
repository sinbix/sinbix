"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeProject = void 0;
const schematics_1 = require("@angular-devkit/schematics");
function nodeProject(options) {
    return schematics_1.chain([
        schematics_1.externalSchematic('@sinbix/node', 'library', Object.assign(Object.assign({}, options), { name: options.projectRoot, directory: '', tags: ['plugin', ...options.projectTags].join(','), publishable: true })),
    ]);
}
exports.nodeProject = nodeProject;
//# sourceMappingURL=node-project.js.map