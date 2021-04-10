import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { from, Observable } from 'rxjs';
import { runCLI } from 'jest';
import { Config } from '@jest/types';
import { map } from 'rxjs/operators';
import * as path from 'path';
import { JestBuilderOptions } from './utils';

export function runBuilder(
  options: JestBuilderOptions,
  context: BuilderContext
): Observable<BuilderOutput> {
  options.jestConfig = path.resolve(context.workspaceRoot, options.jestConfig);

  const jestConfig: {
    transform: any;
    globals: any;
    setupFilesAfterEnv: any;
  } = require(options.jestConfig);

  const transformers = Object.values<string>(jestConfig.transform || {});
  if (transformers.includes('babel-jest') && transformers.includes('ts-jest')) {
    throw new Error(
      'Using babel-jest and ts-jest together is not supported.\n' +
        'See ts-jest documentation for babel integration: https://kulshekhar.github.io/ts-jest/user/config/babelConfig'
    );
  }

  const config: Config.Argv = {
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
      ...(jestConfig.setupFilesAfterEnv ?? []),
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
    config.coverageDirectory = path.join(
      context.workspaceRoot,
      options.coverageDirectory
    );
  }

  if (options.clearCache) {
    config.clearCache = true;
  }

  if (options.reporters && options.reporters.length > 0) {
    config.reporters = options.reporters;
  }

  if (
    Array.isArray(options.coverageReporters) &&
    options.coverageReporters.length > 0
  ) {
    config.coverageReporters = options.coverageReporters;
  }

  return from(runCLI(config, [options.jestConfig])).pipe(
    map(({ results }) => {
      return {
        success: results.success,
      };
    })
  );
}

//@ts-ignore
export default createBuilder(runBuilder);
