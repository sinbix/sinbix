"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBuilder = void 0;
const tslib_1 = require("tslib");
const architect_1 = require("@angular-devkit/architect");
const path = require("path");
const fs_extra_1 = require("fs-extra");
const core_1 = require("@sinbix/core");
const utils_1 = require("./utils");
function runBuilder(options, context) {
    var _a, _b, _c;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const systemRoot = context.workspaceRoot;
        process.chdir(context.currentDirectory);
        const projectName = ((_a = context.target) === null || _a === void 0 ? void 0 : _a.project) || '<???>';
        const printInfo = options.format && !options.silent;
        context.reportStatus(`Linting ${JSON.stringify(projectName)}...`);
        if (printInfo) {
            context.logger.info(`\nLinting ${JSON.stringify(projectName)}...`);
        }
        const projectESLint = yield utils_1.loadESLint();
        const version = (_c = (_b = projectESLint.ESLint) === null || _b === void 0 ? void 0 : _b.version) === null || _c === void 0 ? void 0 : _c.split('.');
        if (!version ||
            version.length < 2 ||
            Number(version[0]) < 7 ||
            (Number(version[0]) === 7 && Number(version[1]) < 6)) {
            throw new Error('ESLint must be version 7.6 or higher.');
        }
        const eslint = new projectESLint.ESLint({ cwd: systemRoot });
        /**
         * We want users to have the option of not specifying the config path, and let
         * eslint automatically resolve the `.eslintrc.json` files in each folder.
         */
        const eslintConfigPath = options.eslintConfig
            ? path.resolve(systemRoot, options.eslintConfig)
            : // : path.resolve(systemRoot, options.eslintConfig)
                undefined;
        // : path.resolve(systemRoot, getBuilderProjectData(context)?.root, '.eslintrc.json')
        const lintResults = yield utils_1.lint(eslintConfigPath, options, systemRoot);
        if (lintResults.length === 0) {
            throw new Error('Invalid lint configuration. Nothing to lint.');
        }
        const formatter = yield eslint.loadFormatter(options.format);
        let totalErrors = 0;
        let totalWarnings = 0;
        // output fixes to disk, if applicable based on the options
        yield projectESLint.ESLint.outputFixes(lintResults);
        for (const result of lintResults) {
            if (result.errorCount || result.warningCount) {
                totalErrors += result.errorCount;
                totalWarnings += result.warningCount;
            }
        }
        const formattedResults = formatter.format(lintResults);
        context.logger.info(formattedResults);
        if (options.outputFile) {
            const pathToOutputFile = path.join(context.workspaceRoot, options.outputFile);
            core_1.createDirectory(path.dirname(pathToOutputFile));
            fs_extra_1.writeFileSync(pathToOutputFile, formattedResults);
        }
        if (totalWarnings > 0 && printInfo) {
            context.logger.warn('Lint warnings found in the listed files.\n');
        }
        if (totalErrors > 0 && printInfo) {
            context.logger.error('Lint errors found in the listed files.\n');
        }
        if (totalWarnings === 0 && totalErrors === 0 && printInfo) {
            context.logger.info('All files pass linting.\n');
        }
        return {
            success: options.force ||
                (totalErrors === 0 &&
                    (options.maxWarnings === -1 || totalWarnings <= options.maxWarnings)),
        };
    });
}
exports.runBuilder = runBuilder;
//@ts-ignore
exports.default = architect_1.createBuilder(runBuilder);
//# sourceMappingURL=builder.js.map