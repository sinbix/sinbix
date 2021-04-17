import { ProjectGraph, ProjectGraphNode } from '../project-graph';
import * as yargs from 'yargs';
import { SinbixArgs } from './utils';
export declare function printAffected(affectedProjectsWithTargetAndConfig: ProjectGraphNode[], affectedProjects: ProjectGraphNode[], projectGraph: ProjectGraph, sinbixArgs: SinbixArgs, overrides: yargs.Arguments): void;
export declare function selectPrintAffected(wholeJson: any, wholeSelect: string): any;
