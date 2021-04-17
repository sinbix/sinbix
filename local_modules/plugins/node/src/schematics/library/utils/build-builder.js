"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildBuilder = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("@sinbix/core/plugin-utils");
const path_1 = require("path");
function buildBuilder(options) {
    const projectName = options.projectName;
    return options.publishable
        ? utils_1.updateWorkspaceInTree((json) => {
            const architect = json.projects[projectName].architect;
            if (architect) {
                architect['build-base'] = {
                    builder: '@sinbix/node:package',
                    options: {
                        outputPath: `dist/${options.projectRoot}`,
                        tsConfig: `${options.projectRoot}/tsconfig.lib.json`,
                        packageJson: `${options.projectRoot}/package.json`,
                        main: options.main
                            ? path_1.join(options.projectRoot, options.main)
                            : undefined,
                        assets: [`${options.projectRoot}/*.md`],
                    },
                };
                architect['build'] = {
                    builder: '@sinbix/common:commands',
                    outputs: [`dist/${options.projectRoot}`],
                    options: {
                        commands: [
                            {
                                command: `npx sinbix build-base ${projectName}`,
                            },
                        ],
                        parallel: false,
                    },
                };
            }
            return json;
        })
        : schematics_1.noop();
}
exports.buildBuilder = buildBuilder;
//# sourceMappingURL=build-builder.js.map