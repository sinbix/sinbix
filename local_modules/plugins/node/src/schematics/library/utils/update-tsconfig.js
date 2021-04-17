"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTsBaseConfig = exports.updateTsConfig = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("@sinbix/core/plugin-utils");
const path_1 = require("path");
function updateTsConfig(options) {
    return (host) => {
        if (!host.exists(path_1.join(options.projectRoot, 'tsconfig.json'))) {
            throw new Error(`Expected ${path_1.join(options.projectRoot, 'tsconfig.json')} to exist. Please create one.`);
        }
        return utils_1.updateJsonInTree(path_1.join(options.projectRoot, 'tsconfig.json'), (json) => {
            if (json.references) {
                json.references.push({
                    path: './tsconfig.lib.json',
                });
            }
            return json;
        });
    };
}
exports.updateTsConfig = updateTsConfig;
function updateTsBaseConfig(options) {
    return !options.skipImport
        ? utils_1.updateJsonInTree('tsconfig.base.json', (json) => {
            const c = json.compilerOptions;
            c.paths = c.paths || {};
            if (c.paths[options.importPath]) {
                throw new schematics_1.SchematicsException(`You already have a library using the import path "${options.importPath}". Make sure to specify a unique one.`);
            }
            if (options.main) {
                c.paths[`${options.importPath}`] = [
                    path_1.join(options.projectRoot, options.main),
                ];
            }
            c.paths[`${options.importPath}/*`] = [`${options.projectRoot}/*`];
            return json;
        })
        : schematics_1.noop();
}
exports.updateTsBaseConfig = updateTsBaseConfig;
//# sourceMappingURL=update-tsconfig.js.map