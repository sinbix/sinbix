import { ProjectGraph } from '../project-graph';
import { FileChange } from '../file-utils';
import { SinbixJson } from '../shared-interfaces';
export declare function filterAffected(graph: ProjectGraph, touchedFiles: FileChange[], workspaceJson?: any, sinbixJson?: SinbixJson, packageJson?: any): ProjectGraph;
