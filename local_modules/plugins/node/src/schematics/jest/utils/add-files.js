"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFiles = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("@sinbix/utils");
function addFiles(options) {
    const projectConfig = options.projectConfig;
    return schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files'), [
        schematics_1.applyTemplates(Object.assign(Object.assign({}, options), { offsetFromRoot: utils_1.offsetFromRoot(projectConfig.root), projectRoot: projectConfig.root, dot: '.' })),
        schematics_1.move(projectConfig.root),
    ]));
}
exports.addFiles = addFiles;
//# sourceMappingURL=add-files.js.map