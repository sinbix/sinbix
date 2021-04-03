import { NormalizedProjectConfigOptions } from '@sinbix/utils';
export interface SchematicSchematicOptions {
    project: string;
    name: string;
    description?: string;
    unitTestRunner: 'jest' | 'none';
}
export interface NormalizedOptions extends SchematicSchematicOptions, NormalizedProjectConfigOptions {
    fileName: string;
    npmScope: string;
    npmPackageName: string;
}
