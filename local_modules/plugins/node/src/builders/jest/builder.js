"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBuilder = void 0;
const architect_1 = require("@angular-devkit/architect");
const rxjs_1 = require("rxjs");
const jest_1 = require("jest");
const operators_1 = require("rxjs/operators");
const path = require("path");
function runBuilder(options, context) {
    var _a;
    options.jestConfig = path.resolve(context.workspaceRoot, options.jestConfig);
    const jestConfig = require(options.jestConfig);
    const transformers = Object.values(jestConfig.transform || {});
    if (transformers.includes('babel-jest') && transformers.includes('ts-jest')) {
        throw new Error('Using babel-jest and ts-jest together is not supported.\n' +
            'See ts-jest documentation for babel integration: https://kulshekhar.github.io/ts-jest/user/config/babelConfig');
    }
    const config = {
        $0: undefined,
        _: [],
        config: options.config,
        coverage: options.codeCoverage,
        bail: options.bail,
        ci: options.ci,
        color: options.color,
        detectOpenHandles: options.detectOpenHandles,
        json: options.json,
        maxWorkers: options.maxWorkers,
        onlyChanged: options.onlyChanged,
        outputFile: options.outputFile,
        passWithNoTests: options.passWithNoTests,
        runInBand: options.runInBand,
        showConfig: options.showConfig,
        silent: options.silent,
        testLocationInResults: options.testLocationInResults,
        testNamePattern: options.testNamePattern,
        testPathPattern: options.testPathPattern,
        colors: options.colors,
        verbose: options.verbose,
        testResultsProcessor: options.testResultsProcessor,
        updateSnapshot: options.updateSnapshot,
        useStderr: options.useStderr,
        watch: options.watch,
        watchAll: options.watchAll,
    };
    // for backwards compatibility
    if (options.setupFile) {
        const setupFilesAfterEnvSet = new Set([
            ...((_a = jestConfig.setupFilesAfterEnv) !== null && _a !== void 0 ? _a : []),
            path.resolve(context.workspaceRoot, options.setupFile),
        ]);
        config.setupFilesAfterEnv = Array.from(setupFilesAfterEnvSet);
    }
    if (options.testFile) {
        config._.push(options.testFile);
    }
    if (options.findRelatedTests) {
        const parsedTests = options.findRelatedTests
            .split(',')
            .map((s) => s.trim());
        config._.push(...parsedTests);
        config.findRelatedTests = true;
    }
    if (options.coverageDirectory) {
        config.coverageDirectory = path.join(context.workspaceRoot, options.coverageDirectory);
    }
    if (options.clearCache) {
        config.clearCache = true;
    }
    if (options.reporters && options.reporters.length > 0) {
        config.reporters = options.reporters;
    }
    if (Array.isArray(options.coverageReporters) &&
        options.coverageReporters.length > 0) {
        config.coverageReporters = options.coverageReporters;
    }
    return rxjs_1.from(jest_1.runCLI(config, [options.jestConfig])).pipe(operators_1.map(({ results }) => {
        return {
            success: results.success,
        };
    }));
}
exports.runBuilder = runBuilder;
//@ts-ignore
exports.default = architect_1.createBuilder(runBuilder);
//# sourceMappingURL=builder.js.map