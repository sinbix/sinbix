import { NormalizedProjectOptions } from '@sinbix/common';

export interface LibrarySchematicOptions {
  name: string;
  directory?: string;
  tags?: string;
  testEnvironment?: 'node' | 'jsdom' | '';
  publishable?: boolean;
  importPath?: string;
  skipImport?: boolean;
  unitTestRunner: 'jest' | 'none';
  linter: 'eslint' | 'none';
}

export interface NormalizedOptions
  extends LibrarySchematicOptions,
    NormalizedProjectOptions {}
