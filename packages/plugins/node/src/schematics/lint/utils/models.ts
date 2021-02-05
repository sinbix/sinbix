import { NormalizedProjectConfigOptions } from '@sinbix/common';

export interface LintSchematicOptions {
  project: string;
}

export interface NormalizedOptions
  extends LintSchematicOptions,
    NormalizedProjectConfigOptions {}
