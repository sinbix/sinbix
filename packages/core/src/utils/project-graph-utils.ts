import { ProjectGraphNode } from "../project-graph";

export function projectHasTarget(project: ProjectGraphNode, target: string) {
  return (
    project.data && project.data.architect && project.data.architect[target]
  );
}

export function projectHasTargetAndConfiguration(
  project: ProjectGraphNode,
  target: string,
  configuration: string
) {
  return (
    projectHasTarget(project, target) &&
    project.data.architect[target].configurations &&
    project.data.architect[target].configurations[configuration]
  );
}
