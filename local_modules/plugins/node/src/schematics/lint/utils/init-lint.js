"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLint = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("@sinbix/core/plugin-utils");
const versions_1 = require("@sinbix/core/utils/versions");
function initLint() {
    return (host) => {
        if (!host.exists('/.eslintrc.json')) {
            return schematics_1.chain([
                utils_1.addDepsToPackageJson({}, {
                    '@typescript-eslint/parser': versions_1.typescriptESLintVersion,
                    '@typescript-eslint/eslint-plugin': versions_1.typescriptESLintVersion,
                    eslint: versions_1.eslintVersion,
                    'eslint-config-prettier': versions_1.eslintConfigPrettierVersion,
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
exports.initLint = initLint;
//# sourceMappingURL=init-lint.js.map