import { ProjectGraph, ProjectGraphBuilder, reverse } from '../project-graph';
import {
  FileChange,
  readSinbixJson,
  readPackageJson,
  readWorkspaceJson,
} from '../file-utils';
import { SinbixJson } from '../shared-interfaces';
import {
  getImplicitlyTouchedProjects,
  getTouchedProjects,
} from './locators/workspace-projects';
import { getTouchedNpmPackages } from './locators/npm-packages';
import { getImplicitlyTouchedProjectsByJsonChanges } from './locators/implicit-json-changes';
import {
  AffectedProjectGraphContext,
  TouchedProjectLocator,
} from './affected-project-graph-models';
import { normalizeSinbixJson } from '../normalize-sinbix-json';
import { getTouchedProjectsInSinbixJson } from './locators/sinbix-json-changes';
import { getTouchedProjectsInWorkspaceJson } from './locators/workspace-json-changes';
import { getTouchedProjectsFromTsConfig } from './locators/tsconfig-json-changes';

export function filterAffected(
  graph: ProjectGraph,
  touchedFiles: FileChange[],
  workspaceJson: any = readWorkspaceJson(),
  nxJson: SinbixJson = readSinbixJson(),
  packageJson: any = readPackageJson()
): ProjectGraph {
  const normalizedNxJson = normalizeSinbixJson(nxJson);
  // Additional affected logic should be in this array.
  const touchedProjectLocators: TouchedProjectLocator[] = [
    getTouchedProjects,
    getImplicitlyTouchedProjects,
    getTouchedNpmPackages,
    getImplicitlyTouchedProjectsByJsonChanges,
    getTouchedProjectsInSinbixJson,
    getTouchedProjectsInWorkspaceJson,
    getTouchedProjectsFromTsConfig,
  ];
  const touchedProjects = touchedProjectLocators.reduce((acc, f) => {
    return acc.concat(
      f(touchedFiles, workspaceJson, normalizedNxJson, packageJson, graph)
    );
  }, [] as string[]);

  return filterAffectedProjects(graph, {
    workspaceJson,
    sinbixJson: normalizedNxJson,
    touchedProjects,
  });
}

// -----------------------------------------------------------------------------

function filterAffectedProjects(
  graph: ProjectGraph,
  ctx: AffectedProjectGraphContext
): ProjectGraph {
  const builder = new ProjectGraphBuilder();
  const reversed = reverse(graph);
  ctx.touchedProjects.forEach((p) => {
    addAffectedNodes(p, reversed, builder, []);
  });
  ctx.touchedProjects.forEach((p) => {
    addAffectedDependencies(p, reversed, builder, []);
  });
  return builder.build();
}

function addAffectedNodes(
  startingProject: string,
  reversed: ProjectGraph,
  builder: ProjectGraphBuilder,
  visited: string[]
): void {
  if (visited.indexOf(startingProject) > -1) return;
  if (!reversed.nodes[startingProject]) {
    throw new Error(`Invalid project name is detected: "${startingProject}"`);
  }
  visited.push(startingProject);
  builder.addNode(reversed.nodes[startingProject]);
  reversed.dependencies[startingProject].forEach(({ target }) =>
    addAffectedNodes(target, reversed, builder, visited)
  );
}

function addAffectedDependencies(
  startingProject: string,
  reversed: ProjectGraph,
  builder: ProjectGraphBuilder,
  visited: string[]
): void {
  if (visited.indexOf(startingProject) > -1) return;
  visited.push(startingProject);

  reversed.dependencies[startingProject].forEach(({ target }) =>
    addAffectedDependencies(target, reversed, builder, visited)
  );
  reversed.dependencies[startingProject].forEach(({ type, source, target }) => {
    // Since source and target was reversed,
    // we need to reverse it back to original direction.
    builder.addDependency(type, target, source);
  });
}
