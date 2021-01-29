import { NormalizedProjectOptions } from '@sinbix/common';

export interface E2eSchematicOptions {
  pluginName: string;
  e2eDirectory: string;
  npmPackageName: string;
  pluginOutputPath: string;
  jestConfig: string;
}

export interface NormalizedOptions
  extends E2eSchematicOptions,
    NormalizedProjectOptions {
  npmScope: string;
}
