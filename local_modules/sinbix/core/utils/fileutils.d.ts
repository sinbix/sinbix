export declare function writeToFile(filePath: string, str: string): void;
/**
 * This method is specifically for updating a JSON file using the filesystem
 *
 * @remarks
 * If you are looking to update a JSON file in a tree, look for ./ast-utils#updateJsonInTree
 * @param path Path of the JSON file on the filesystem
 * @param callback Manipulation of the JSON data
 */
export declare function updateJsonFile(path: string, callback: (a: any) => any): void;
export declare function serializeJson(json: any): string;
/**
 * This method is specifically for reading a JSON file from the filesystem
 *
 * @remarks
 * If you are looking to read a JSON file in a Tree, use ./ast-utils#readJsonInTree
 * @param path Path of the JSON file on the filesystem
 */
export declare function readJsonFile<T = any>(path: string): T;
export declare function parseJsonWithComments<T = any>(content: string): T;
export declare function writeJsonFile(path: string, json: any): void;
export declare function readWorkspaceConfigPath(): any;
export declare function copyFile(file: string, target: string): void;
export declare function directoryExists(name: any): boolean;
export declare function fileExists(filePath: string): boolean;
export declare function createDirectory(directoryPath: string): void;
export declare function renameSync(from: string, to: string, cb: (err: Error | null) => void): void;
export declare function isRelativePath(path: string): boolean;
