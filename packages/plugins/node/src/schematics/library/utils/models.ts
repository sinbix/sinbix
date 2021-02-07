import { NormalizedProjectOptions } from '@sinbix/utils';

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
  testTimeout: string;
}

export interface NormalizedOptions
  extends LibrarySchematicOptions,
    NormalizedProjectOptions {}
