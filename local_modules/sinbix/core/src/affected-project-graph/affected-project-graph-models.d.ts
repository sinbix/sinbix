import { SinbixJson } from '../shared-interfaces';
import { Change, FileChange } from '../file-utils';
import { ProjectGraph } from '../project-graph';
export interface AffectedProjectGraphContext {
    workspaceJson: any;
    sinbixJson: SinbixJson<string[]>;
    touchedProjects: string[];
}
export interface TouchedProjectLocator<T extends Change = Change> {
    (fileChanges: FileChange<T>[], workspaceJson?: any, sinbixJson?: SinbixJson<string[]>, packageJson?: any, projectGraph?: ProjectGraph): string[];
}
