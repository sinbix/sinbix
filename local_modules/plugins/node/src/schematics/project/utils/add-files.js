"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFiles = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("@sinbix/core/plugin-utils");
function addFiles(options) {
    return schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files'), [
        schematics_1.applyTemplates(Object.assign(Object.assign({}, options), { offsetFromRoot: utils_1.offsetFromRoot(options.projectRoot), dot: '.' })),
        schematics_1.move(options.projectRoot),
    ]));
}
exports.addFiles = addFiles;
//# sourceMappingURL=add-files.js.map