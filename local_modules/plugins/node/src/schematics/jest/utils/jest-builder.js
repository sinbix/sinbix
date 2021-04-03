"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jestBuilder = void 0;
const utils_1 = require("@sinbix/utils");
function jestBuilder(options) {
    const projectConfig = options.projectConfig;
    return utils_1.updateWorkspaceInTree((workspace) => {
        const architect = workspace.projects[options.project].architect;
        if (architect) {
            architect['test'] = {
                builder: '@sinbix/node:jest',
                options: {
                    jestConfig: `${projectConfig.root}/jest.config.js`,
                    passWithNoTests: true,
                },
            };
        }
        return workspace;
    });
}
exports.jestBuilder = jestBuilder;
//# sourceMappingURL=jest-builder.js.map