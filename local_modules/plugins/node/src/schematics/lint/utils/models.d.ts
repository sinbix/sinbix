import { NormalizedProjectConfigOptions } from '@sinbix/core/plugin-utils';
export interface LintSchematicOptions {
    project: string;
}
export interface NormalizedOptions extends LintSchematicOptions, NormalizedProjectConfigOptions {
}
