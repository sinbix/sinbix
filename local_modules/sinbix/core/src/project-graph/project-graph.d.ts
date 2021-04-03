import { FileRead } from '../file-utils';
import { ProjectGraph } from './project-graph-models';
import { ProjectGraphCache } from '../sinbix-deps/sinbix-deps-cache';
import { SinbixJson } from '../shared-interfaces';
export declare function createProjectGraph(workspaceJson?: any, sinbixJson?: SinbixJson<string[] | "*">, workspaceFiles?: import("../file-utils").FileData[], fileRead?: FileRead, cache?: false | ProjectGraphCache, shouldCache?: boolean): ProjectGraph;
