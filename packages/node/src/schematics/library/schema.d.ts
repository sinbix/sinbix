export interface LibrarySchematicSchema {
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
