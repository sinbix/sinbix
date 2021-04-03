"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e2eProject = void 0;
const schematics_1 = require("@angular-devkit/schematics");
function e2eProject(options) {
    return schematics_1.chain([
        options.unitTestRunner === 'jest'
            ? schematics_1.schematic('e2e', {
                pluginName: options.projectName,
                npmPackageName: options.importPath,
                pluginOutputPath: `dist/${options.projectRoot}`,
            })
            : schematics_1.noop(),
    ]);
}
exports.e2eProject = e2eProject;
//# sourceMappingURL=e2e-project.js.map