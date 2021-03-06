import { Task } from './tasks-runner';
import { DefaultTasksRunnerOptions } from './default-tasks-runner';
export declare type CachedResult = {
    terminalOutput: string;
    outputsPath: string;
};
export declare type TaskWithCachedResult = {
    task: Task;
    cachedResult: CachedResult;
};
declare class CacheConfig {
    private readonly options;
    constructor(options: DefaultTasksRunnerOptions);
    isCacheableTask(task: Task): boolean;
    private longRunningTask;
}
export declare class Cache {
    private readonly options;
    root: string;
    cachePath: any;
    terminalOutputsDir: string;
    cacheConfig: CacheConfig;
    constructor(options: DefaultTasksRunnerOptions);
    removeOldCacheRecords(): void;
    get(task: Task): Promise<CachedResult>;
    put(task: Task, terminalOutputPath: string, outputs: string[]): Promise<void>;
    copyFilesFromCache(cachedResult: CachedResult, outputs: string[]): void;
    temporaryOutputPath(task: Task): string;
    private getFromLocalDir;
    private createCacheDir;
    private createTerminalOutputsDir;
}
export {};
