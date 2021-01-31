import { NormalizedProjectOptions } from '@sinbix/common';

export interface ProjectSchematicOptions {
  name: string;
  directory?: string;
  tags?: string;
  importPath: string;
  skipImport: boolean;
  unitTestRunner: 'jest' | 'none';
  linter: 'eslint' | 'none';
}

export interface NormalizedOptions
  extends NormalizedProjectOptions,
    ProjectSchematicOptions {}
