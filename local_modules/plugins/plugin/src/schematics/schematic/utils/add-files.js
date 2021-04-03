"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFiles = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("@sinbix/utils");
function addFiles(options) {
    return schematics_1.mergeWith(schematics_1.apply(schematics_1.url(`./files`), [
        schematics_1.applyTemplates(Object.assign(Object.assign(Object.assign({}, options), utils_1.names(options.name)), { ejsName: '<%= name %>' })),
        options.unitTestRunner === 'none'
            ? schematics_1.filter((file) => !file.endsWith('.spec.ts'))
            : schematics_1.noop(),
        schematics_1.move(`${options.projectConfig.root}/schematics`),
    ]));
}
exports.addFiles = addFiles;
//# sourceMappingURL=add-files.js.map