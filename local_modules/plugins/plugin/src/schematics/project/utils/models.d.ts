import { NormalizedProjectOptions } from '@sinbix/core/plugin-utils';
export interface ProjectSchematicOptions {
    name: string;
    directory?: string;
    tags?: string;
    importPath: string;
    skipImport: boolean;
    unitTestRunner: 'jest' | 'none';
    linter: 'eslint' | 'none';
    skipInit: boolean;
}
export interface NormalizedOptions extends NormalizedProjectOptions, ProjectSchematicOptions {
}
