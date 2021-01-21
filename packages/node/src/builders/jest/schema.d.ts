import { JsonObject } from '@angular-devkit/core';

export interface JestBuilderSchema extends JsonObject {
  codeCoverage?: boolean;
  config?: string;
  detectOpenHandles?: boolean;
  jestConfig: string;
  testFile?: string;
  setupFile?: string;
  bail?: boolean | number;
  ci?: boolean;
  color?: boolean;
  clearCache?: boolean;
  findRelatedTests?: string;
  json?: boolean;
  maxWorkers?: number | string;
  onlyChanged?: boolean;
  outputFile?: string;
  passWithNoTests?: boolean;
  runInBand?: boolean;
  showConfig?: boolean;
  silent?: boolean;
  testNamePattern?: string;
  testPathPattern?: string[];
  colors?: boolean;
  reporters?: string[];
  verbose?: boolean;
  coverageReporters?: string[];
  coverageDirectory?: string;
  testResultsProcessor?: string;
  updateSnapshot?: boolean;
  useStderr?: boolean;
  watch?: boolean;
  watchAll?: boolean;
  testLocationInResults?: boolean;
}
