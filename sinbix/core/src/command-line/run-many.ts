import * as yargs from 'yargs';
import { runCommand } from '../tasks-runner/run-command';
import { SinbixArgs, splitArgsIntoSinbixArgsAndOverrides } from './utils';
import {
  createProjectGraph,
  isWorkspaceProject,
  ProjectGraph,
  ProjectGraphNode,
  withDeps,
} from '../project-graph';
import { readEnvironment } from '../file-utils';
import { DefaultReporter } from '../tasks-runner/default-reporter';
import { projectHasTarget } from '../utils/project-graph-utils';
import { output } from '../utils/output';

export async function runMany(parsedArgs: yargs.Arguments) {
  const { sinbixArgs, overrides } = splitArgsIntoSinbixArgsAndOverrides(
    parsedArgs,
    'run-many'
  );

  const projectGraph = createProjectGraph();
  const projects = projectsToRun(sinbixArgs, projectGraph);
  const projectMap: Record<string, ProjectGraphNode> = {};
  projects.forEach((proj) => {
    projectMap[proj.name] = proj;
  });
  const env = readEnvironment(sinbixArgs.target, projectMap);
  const filteredProjects = Object.values(projects).filter(
    (n) => !parsedArgs.onlyFailed || !env.workspaceResults.getResult(n.name)
  );
  runCommand(
    filteredProjects,
    projectGraph,
    env,
    sinbixArgs,
    overrides,
    new DefaultReporter(),
    null
  );
}

function projectsToRun(sinbixArgs: SinbixArgs, projectGraph: ProjectGraph) {
  const allProjects = Object.values(projectGraph.nodes);
  if (sinbixArgs.all) {
    return runnableForTarget(allProjects, sinbixArgs.target);
  } else {
    checkForInvalidProjects(sinbixArgs, allProjects);
    let selectedProjects = allProjects.filter(
      (p) => sinbixArgs.projects.indexOf(p.name) > -1
    );
    if (sinbixArgs.withDeps) {
      selectedProjects = Object.values(
        withDeps(projectGraph, selectedProjects).nodes
      );
    }
    return runnableForTarget(selectedProjects, sinbixArgs.target, true);
  }
}

function checkForInvalidProjects(
  sinbixArgs: SinbixArgs,
  allProjects: ProjectGraphNode[]
) {
  const invalid = sinbixArgs.projects.filter(
    (name) => !allProjects.find((p) => p.name === name)
  );
  if (invalid.length !== 0) {
    throw new Error(`Invalid projects: ${invalid.join(', ')}`);
  }
}

function runnableForTarget(
  projects: ProjectGraphNode[],
  target: string,
  strict = false
): ProjectGraphNode[] {
  const notRunnable = [] as ProjectGraphNode[];
  const runnable = [] as ProjectGraphNode[];

  for (const project of projects) {
    if (projectHasTarget(project, target)) {
      runnable.push(project);
    } else if (isWorkspaceProject(project)) {
      notRunnable.push(project);
    }
  }

  if (strict && notRunnable.length) {
    output.warn({
      title: `the following do not have configuration for "${target}"`,
      bodyLines: notRunnable.map((p) => '- ' + p.name),
    });
  }

  return runnable;
}
