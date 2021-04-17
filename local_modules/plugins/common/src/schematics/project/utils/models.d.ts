import { NormalizedProjectOptions, ProjectType } from '@sinbix/core/plugin-utils';
export interface ProjectSchematicOptions {
    name: string;
    directory?: string;
    type?: ProjectType;
    tags?: string;
    dependencies?: string;
    sourceRoot?: string;
    skipGitkeep: boolean;
}
export interface NormalizedOptions extends ProjectSchematicOptions, NormalizedProjectOptions {
    projectDependencies: string[];
}
