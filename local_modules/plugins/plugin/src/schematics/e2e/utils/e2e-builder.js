"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e2eBuilder = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("@sinbix/utils");
function e2eBuilder(options) {
    return schematics_1.chain([
        utils_1.updateWorkspaceInTree((workspace) => {
            const project = workspace.projects[options.projectName];
            project.architect.e2e = {
                builder: '@sinbix/plugin:e2e',
                options: {},
            };
            return workspace;
        }),
    ]);
}
exports.e2eBuilder = e2eBuilder;
//# sourceMappingURL=e2e-builder.js.map