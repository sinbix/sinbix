import { Cache } from './cache';
import { ProjectGraph } from '../project-graph';
import { Task } from './tasks-runner';
import { DefaultTasksRunnerOptions } from './default-tasks-runner';
export declare class TaskOrchestrator {
    private readonly initiatingProject;
    private readonly projectGraph;
    private readonly options;
    workspaceRoot: string;
    cache: Cache;
    cli: string;
    private processes;
    constructor(initiatingProject: string | undefined, projectGraph: ProjectGraph, options: DefaultTasksRunnerOptions);
    run(tasksInStage: Task[]): Promise<any[]>;
    private runRest;
    private splitTasksIntoCachedAndNotCached;
    private applyCachedResults;
    private pipeOutputCapture;
    private forkProcessPipeOutputCapture;
    private forkProcessDirectOutputCapture;
    private envForForkedProcess;
    private shouldForwardOutput;
    private getCommand;
    private getCommandArgs;
    private setupOnProcessExitListener;
}
