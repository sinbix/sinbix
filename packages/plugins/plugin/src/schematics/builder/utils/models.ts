import { NormalizedProjectConfigOptions } from '@sinbix/utils';

export interface BuilderSchematicOptions {
  project: string;
  name: string;
  description?: string;
  unitTestRunner: 'jest' | 'none';
}

export interface NormalizedOptions
  extends BuilderSchematicOptions,
    NormalizedProjectConfigOptions {
  fileName: string;
  npmScope: string;
}
