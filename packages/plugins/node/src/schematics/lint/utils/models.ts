import { NormalizedProjectConfigOptions } from '@sinbix/utils';

export interface LintSchematicOptions {
  project: string;
}

export interface NormalizedOptions
  extends LintSchematicOptions,
    NormalizedProjectConfigOptions {}
