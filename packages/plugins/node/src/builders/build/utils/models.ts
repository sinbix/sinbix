import { Path } from '@angular-devkit/core';

export interface BuildBuilderOptions {
  main: string;
  outputPath: string;
  tsConfig: string;
  watch?: boolean;
  sourceMap?: boolean | SourceMapOptions;
  optimization?: boolean | OptimizationOptions;
  showCircularDependencies?: boolean;
  maxWorkers?: number;
  memoryLimit?: number;
  poll?: number;

  fileReplacements: FileReplacement[];
  assets?: any[];

  progress?: boolean;
  statsJson?: boolean;
  extractLicenses?: boolean;
  verbose?: boolean;

  webpackConfig?: string;

  root?: string;
  sourceRoot?: Path;
  projectRoot?: string;

  externalDependencies: 'all' | 'none' | string[];
  buildLibsFromSource?: boolean;
  generatePackageJson?: boolean;
}

export interface SourceMapOptions {
  scripts: boolean;
  styles: boolean;
  vendors: boolean;
  hidden: boolean;
}

export interface OptimizationOptions {
  scripts: boolean;
  styles: boolean;
}

export interface FileReplacement {
  replace: string;
  with: string;
}
