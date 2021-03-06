import { FileMap } from '../file-graph';
import { FileData } from '../file-utils';
import { SinbixJson } from '../shared-interfaces';
export interface ProjectGraph {
    nodes: Record<string, ProjectGraphNode>;
    dependencies: Record<string, ProjectGraphDependency[]>;
}
export declare enum DependencyType {
    static = "static",
    dynamic = "dynamic",
    implicit = "implicit"
}
export interface ProjectGraphNode<T extends {} = {}> {
    type: string;
    name: string;
    data: T & {
        architect?: {
            [k: string]: any;
        };
        files: FileData[];
        [k: string]: any;
    };
}
export declare type ProjectGraphNodeRecords = Record<string, ProjectGraphNode>;
export declare type AddProjectNode = (node: ProjectGraphNode) => void;
export interface ProjectGraphDependency {
    type: DependencyType | string;
    target: string;
    source: string;
}
export declare type AddProjectDependency = (type: DependencyType | string, source: string, target: string) => void;
export interface ProjectGraphContext {
    workspaceJson: any;
    sinbixJson: SinbixJson;
    fileMap: FileMap;
}
export declare enum ProjectType {
    app = "app",
    e2e = "e2e",
    lib = "lib"
}
