"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lint = exports.loadESLint = void 0;
const tslib_1 = require("tslib");
function loadESLint() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let eslint;
        try {
            eslint = yield Promise.resolve().then(() => require('eslint'));
            return eslint;
        }
        catch (_a) {
            throw new Error('Unable to find ESLint. Ensure ESLint is installed.');
        }
    });
}
exports.loadESLint = loadESLint;
function lint(eslintConfigPath, options, workspaceRoot) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const projectESLint = yield loadESLint();
        const eslint = new projectESLint.ESLint({
            cwd: workspaceRoot,
            useEslintrc: true,
            overrideConfigFile: eslintConfigPath,
            ignorePath: options.ignorePath || undefined,
            fix: !!options.fix,
            cache: !!options.cache,
            cacheLocation: options.cacheLocation || undefined,
            /**
             * Default is `true` and if not overridden the eslint.lintFiles() method will throw an error
             * when no target files are found.
             *
             * We don't want ESLint to throw an error if a user has only just created
             * a project and therefore doesn't necessarily have matching files, for example.
             */
            errorOnUnmatchedPattern: false,
        });
        return yield eslint.lintFiles(options.lintFilePatterns
        // options.lintFilePatterns.map((pattern) => {
        //   return join(workspaceRoot, pattern);
        // })
        );
    });
}
exports.lint = lint;
//# sourceMappingURL=eslint.js.map