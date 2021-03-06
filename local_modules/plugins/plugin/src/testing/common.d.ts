export declare function copyNodeModules(project: string, modules: string[]): void;
export declare function updateFile(project: string, path: string, content: string | ((originalFileContent: string) => string)): void;
export declare function renameFile(project: string, path: string, newPath: string): void;
export declare function checkFilesExist(project: string, expectedPaths: string[]): void;
export declare function listFiles(project: string, path?: string): any;
export declare function readJson(project: string, path: string): any;
export declare function readFile(project: string, path: string): any;
export declare function cleanup(project: string): void;
export declare function rmDist(project: string): void;
export declare function getCwd(): string;
export declare function directoryExists(path: string): boolean;
export declare function fileExists(path: string): boolean;
export declare function exists(path: string): boolean;
export declare function getSize(path: string): number;
export declare function uniq(prefix: string): string;
