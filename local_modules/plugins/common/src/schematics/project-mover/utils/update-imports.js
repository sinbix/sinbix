"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateImports = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("@sinbix/utils");
const _ = require("lodash");
function updateImports(options) {
    return (host) => {
        var _a;
        const project = utils_1.getProjectConfig(host, options.projectName);
        if (project.projectType === 'application') {
            return;
        }
        const tsConfig = utils_1.readJsonInTree(host, 'tsconfig.base.json');
        const c = tsConfig.compilerOptions;
        const paths = c.paths || {};
        const fromPaths = _.keys(paths).filter((path) => paths[path].some((x) => x.startsWith(project.root)));
        if (fromPaths.length) {
            const basePath = (_a = fromPaths
                .sort((a, b) => a.length - b.length)) === null || _a === void 0 ? void 0 : _a[0].replace('/*', '');
            const addSeg = (fromPath) => {
                const seg = fromPath.replace(basePath, '');
                return seg !== fromPath ? seg !== null && seg !== void 0 ? seg : '' : '';
            };
            const projectRefs = fromPaths.map((fromPath) => ({
                from: fromPath,
                to: `${options.importPath ||
                    utils_1.normalizeSlashes(`@${utils_1.getNpmScope(host)}/${options.destination}`)}${addSeg(fromPath)}`,
            }));
            return schematics_1.chain([
                updateFiles(options, projectRefs),
                updateTsConfig(options, projectRefs),
            ]);
        }
    };
}
exports.updateImports = updateImports;
function updateFiles(options, projectRefs) {
    return (host) => {
        if (options.updateImportPath) {
            for (const [name, definition] of _.entries(utils_1.readJsonInTree(host, 'angular.json').projects)) {
                if (name === options.projectName) {
                    continue;
                }
                const projectDir = host.getDir(definition.root);
                projectDir.visit((file) => {
                    const contents = host.read(file).toString('utf-8');
                    projectRefs.forEach((projectRef) => {
                        const replaceFrom = new RegExp(projectRef.from, 'g');
                        if (!replaceFrom.test(contents)) {
                            return;
                        }
                        host.overwrite(file, host.read(file).toString().replace(replaceFrom, projectRef.to));
                    });
                });
            }
        }
    };
}
function updateTsConfig(options, projectRefs) {
    return (host) => {
        return utils_1.updateJsonInTree('tsconfig.base.json', (json) => {
            const c = json.compilerOptions;
            const paths = c.paths || {};
            const project = utils_1.getProjectConfig(host, options.projectName);
            const projectRoot = {
                from: project.root,
                to: options.destination,
            };
            projectRefs.forEach((projectRef) => {
                const path = paths[projectRef.from];
                const updatedPath = path.map((x) => x.replace(new RegExp(projectRoot.from, 'g'), projectRoot.to));
                if (options.updateImportPath) {
                    paths[projectRef.to] = updatedPath;
                    delete paths[projectRef.from];
                }
                else {
                    paths[projectRef.from] = updatedPath;
                }
            });
            return json;
        });
    };
}
//# sourceMappingURL=update-imports.js.map