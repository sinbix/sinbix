import { Tree } from '@angular-devkit/schematics';
export declare function normalizeProjectName(name: string): string;
export interface ProjectOptions {
    name: string;
    directory?: string;
    tags?: string;
}
export interface NormalizedProjectOptions {
    projectName: string;
    projectRoot: string;
    projectTags: string[];
}
export declare function normalizeProject(options: ProjectOptions): NormalizedProjectOptions;
export interface NormalizedProjectConfigOptions {
    projectConfig: any;
}
export declare function normalizeProjectConfig(host: Tree, project: string): NormalizedProjectConfigOptions;
export declare function getDestination(path: string): string;
export declare function getNewProjectName(path: string): string;
export declare function normalizeSlashes(input: string): string;
