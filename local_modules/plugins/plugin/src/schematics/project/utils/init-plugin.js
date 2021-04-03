"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPlugin = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("@sinbix/utils");
const path_1 = require("path");
function initPlugin(options) {
    return schematics_1.chain([updateWorkspaceProject(options), updatePackageJson(options)]);
}
exports.initPlugin = initPlugin;
function updateWorkspaceProject(options) {
    return (host) => {
        const projectConfig = utils_1.getProjectConfig(host, options.projectName);
        return utils_1.updateWorkspaceInTree((workspace) => {
            const build = workspace.projects[options.projectName].architect['build-base'];
            if (build) {
                build.options.assets.push(...[
                    {
                        input: `./${options.projectRoot}/schematics`,
                        glob: '**/*.!(ts)',
                        output: './schematics',
                    },
                    {
                        input: `./${options.projectRoot}/builders`,
                        glob: '**/*.!(ts)',
                        output: './builders',
                    },
                    {
                        input: `./${options.projectRoot}`,
                        glob: 'collection.json',
                        output: '.',
                    },
                    {
                        input: `./${options.projectRoot}`,
                        glob: 'builders.json',
                        output: '.',
                    },
                ]);
            }
            return workspace;
        });
    };
}
function updatePackageJson(options) {
    return utils_1.updateJsonInTree(path_1.join(options.projectRoot, 'package.json'), (json) => {
        json.schematics = './collection.json';
        json.buiders = './builders.json';
        if (json)
            return json;
    });
}
//# sourceMappingURL=init-plugin.js.map