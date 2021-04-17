import { NormalizedProjectOptions } from '@sinbix/core/plugin-utils';

export interface E2eSchematicOptions {
  pluginName: string;
  directory: string;
  npmPackageName: string;
  pluginOutputPath: string;
}

export interface NormalizedOptions
  extends E2eSchematicOptions,
    NormalizedProjectOptions {
  npmScope: string;
}
