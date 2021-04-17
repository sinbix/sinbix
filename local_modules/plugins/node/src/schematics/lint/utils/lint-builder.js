"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lintBuilder = void 0;
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
function lintBuilder(options) {
    const project = options.project;
    return plugin_utils_1.updateWorkspaceInTree((workspace) => {
        const architect = workspace.projects[project].architect;
        if (architect) {
            architect['lint'] = {
                builder: '@sinbix/node:lint',
                options: {
                    lintFilePatterns: [`${options.projectConfig.root}/**/*.ts`],
                },
            };
        }
        return workspace;
    });
}
exports.lintBuilder = lintBuilder;
//# sourceMappingURL=lint-builder.js.map