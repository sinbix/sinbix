import { CLIErrorMessageConfig } from '../utils/output';
import { ProjectGraph } from '../project-graph';
export declare class WorkspaceIntegrityChecks {
    private projectGraph;
    private files;
    constructor(projectGraph: ProjectGraph, files: string[]);
    run(): CLIErrorMessageConfig[];
    private projectWithoutFilesCheck;
    private filesWithoutProjects;
    private allProjectFiles;
}
