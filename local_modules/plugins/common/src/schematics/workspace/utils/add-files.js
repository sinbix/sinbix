"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFiles = exports.DEFAULT_NRWL_PRETTIER_CONFIG = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const versions_1 = require("@sinbix/core/utils/versions");
exports.DEFAULT_NRWL_PRETTIER_CONFIG = {
    singleQuote: true,
};
function addFiles(options) {
    const npmScope = options.npmScope ? options.npmScope : options.name;
    return schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files'), [
        schematics_1.applyTemplates(Object.assign(Object.assign({ utils: core_1.strings, dot: '.', workspaceFile: 'workspace', cliCommand: 'sinbix', typescriptVersion: versions_1.typescriptVersion,
            prettierVersion: versions_1.prettierVersion,
            eslintVersion: versions_1.eslintVersion,
            // angular cli is used only when workspace schematics is added to angular cli
            angularCliVersion: versions_1.angularCliVersion }, options), { sinbixVersion: versions_1.sinbixVersion,
            npmScope, defaultNrwlPrettierConfig: JSON.stringify(exports.DEFAULT_NRWL_PRETTIER_CONFIG, null, 2) })),
    ]));
}
exports.addFiles = addFiles;
//# sourceMappingURL=add-files.js.map