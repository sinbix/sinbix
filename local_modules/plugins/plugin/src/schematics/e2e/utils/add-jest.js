"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addJest = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("@sinbix/utils");
function addJest(options) {
    return schematics_1.chain([
        schematics_1.externalSchematic('@sinbix/node', 'jest', {
            project: options.projectName,
            setupFile: 'none',
            supportTsx: false,
            skipSerializers: true,
            testTimeout: 60 * 60 * 1000,
        }),
        updateWorkspaceProject(options),
    ]);
}
exports.addJest = addJest;
function updateWorkspaceProject(options) {
    return utils_1.updateWorkspaceInTree((workspace) => {
        const project = workspace.projects[options.projectName];
        const testOptions = project.architect.test.options;
        const e2eOptions = project.architect.e2e.options;
        project.architect.e2e.options = Object.assign(Object.assign({}, e2eOptions), { jestConfig: testOptions.jestConfig });
        delete project.architect.test;
        return workspace;
    });
}
//# sourceMappingURL=add-jest.js.map