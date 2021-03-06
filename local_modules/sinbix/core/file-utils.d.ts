import { SinbixArgs } from './command-line/utils';
import { ProjectGraphNode } from './project-graph';
import { Environment, SinbixJson } from './shared-interfaces';
export interface FileData {
    file: string;
    hash: string;
    ext: string;
}
export interface Change {
    type: string;
}
export interface FileChange<T extends Change = Change> extends FileData {
    getChanges: () => T[];
}
export declare class WholeFileChange implements Change {
    type: string;
}
export declare function isWholeFileChange(change: Change): change is WholeFileChange;
export declare function calculateFileChanges(files: string[], sinbixArgs?: SinbixArgs, readFileAtRevision?: (f: string, r: void | string) => string, ignore?: import("ignore").Ignore): FileChange[];
export declare const TEN_MEGABYTES: number;
export declare function allFilesInDir(dirName: string, recurse?: boolean): FileData[];
export declare function readWorkspaceJson(): any;
export declare function cliCommand(): string;
export declare function workspaceFileName(): "workspace.json" | "angular.json";
export declare type FileRead = (s: string) => string;
export declare function defaultFileRead(filePath: string): string | null;
export declare function readPackageJson(): any;
export declare function readSinbixJson(): SinbixJson;
export declare function workspaceLayout(): {
    appsDir: string;
    libsDir: string;
};
export declare function rootWorkspaceFileNames(): string[];
export declare function rootWorkspaceFileData(): FileData[];
export declare function readWorkspaceFiles(): FileData[];
export declare function readEnvironment(target: string, projects: Record<string, ProjectGraphNode>): Environment;
export declare function normalizedProjectRoot(p: ProjectGraphNode): string;
export declare function filesChanged(a: FileData[], b: FileData[]): boolean;
