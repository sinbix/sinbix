"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initJest = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
const utils_1 = require("../../../utils");
function initJest() {
    return (host) => {
        if (!host.exists('/jest.config.js')) {
            return schematics_1.chain([
                plugin_utils_1.addDepsToPackageJson({}, {
                    jest: utils_1.jestVersion,
                    '@types/jest': utils_1.jestTypesVersion,
                    'ts-jest': utils_1.tsJestVersion,
                }),
                schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files-init'), [
                    schematics_1.applyTemplates({
                        dot: '.',
                    }),
                ])),
            ]);
        }
    };
}
exports.initJest = initJest;
//# sourceMappingURL=init-jest.js.map