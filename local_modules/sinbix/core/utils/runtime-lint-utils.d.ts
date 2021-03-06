import { ProjectGraph, ProjectGraphDependency, ProjectGraphNode } from '../project-graph';
import { TargetProjectLocator } from '../target-project-locator';
export declare type Deps = {
    [projectName: string]: ProjectGraphDependency[];
};
export declare type DepConstraint = {
    sourceTag: string;
    onlyDependOnLibsWithTags: string[];
};
export declare function hasNoneOfTheseTags(proj: ProjectGraphNode, tags: string[]): boolean;
export declare function matchImportWithWildcard(allowableImport: string, extractedImport: string): boolean;
export declare function isRelative(s: string): boolean;
export declare function isRelativeImportIntoAnotherProject(imp: string, projectPath: string, projectGraph: ProjectGraph, sourceFilePath: string): boolean;
export declare function findProjectUsingFile(projectGraph: ProjectGraph, file: string): ProjectGraphNode<{}>;
export declare function findSourceProject(projectGraph: ProjectGraph, sourceFilePath: string): ProjectGraphNode<{}>;
export declare function findTargetProject(projectGraph: ProjectGraph, targetFile: string): ProjectGraphNode<{}>;
export declare function isAbsoluteImportIntoAnotherProject(imp: string): boolean;
export declare function findProjectUsingImport(projectGraph: ProjectGraph, targetProjectLocator: TargetProjectLocator, filePath: string, imp: string, npmScope: string): ProjectGraphNode<{}>;
export declare function checkCircularPath(graph: ProjectGraph, sourceProject: ProjectGraphNode, targetProject: ProjectGraphNode): Array<ProjectGraphNode>;
export declare function findConstraintsFor(depConstraints: DepConstraint[], sourceProject: ProjectGraphNode): DepConstraint[];
export declare function onlyLoadChildren(graph: ProjectGraph, sourceProjectName: string, targetProjectName: string, visited: string[]): any;
export declare function getSourceFilePath(sourceFileName: string, projectPath: string): string;
/**
 * Verifies whether the given node has an architect builder attached
 * @param projectGraph the node to verify
 */
export declare function hasArchitectBuildBuilder(projectGraph: ProjectGraphNode): boolean;
