import { Task, TasksRunner } from './tasks-runner';
import { ReporterArgs } from './default-reporter';
import * as yargs from 'yargs';
import { ProjectGraph, ProjectGraphNode } from '../project-graph';
import { Environment, SinbixJson } from '../shared-interfaces';
import { SinbixArgs } from "../command-line/utils";
declare type RunArgs = yargs.Arguments & ReporterArgs;
export declare function runCommand<T extends RunArgs>(projectsToRun: ProjectGraphNode[], projectGraph: ProjectGraph, { sinbixJson, workspaceResults }: Environment, sinbixArgs: SinbixArgs, overrides: any, reporter: any, initiatingProject: string | null): Promise<void>;
export interface TaskParams {
    project: ProjectGraphNode;
    target: string;
    configuration: string;
    overrides: Object;
}
export declare function createTask({ project, target, configuration, overrides, }: TaskParams): Task;
export declare function getRunner(sinbixArgs: SinbixArgs, sinbixJson: SinbixJson, overrides: any): Promise<{
    tasksRunner: TasksRunner;
    tasksOptions: unknown;
}>;
export {};
