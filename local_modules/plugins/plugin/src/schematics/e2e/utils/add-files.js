"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFiles = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("@sinbix/utils");
function addFiles(options) {
    return schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files'), [
        schematics_1.applyTemplates(Object.assign(Object.assign(Object.assign({}, options), utils_1.names(options.pluginName)), { offsetFromRoot: utils_1.offsetFromRoot(options.projectRoot) })),
        schematics_1.move(options.projectRoot),
    ]));
}
exports.addFiles = addFiles;
//# sourceMappingURL=add-files.js.map