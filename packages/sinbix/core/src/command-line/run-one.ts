import { runCommand } from '../tasks-runner/run-command';
import { createProjectGraph, ProjectGraph } from '../project-graph';
import { readEnvironment } from '../file-utils';
import { EmptyReporter } from '../tasks-runner/empty-reporter';
import { splitArgsIntoSinbixArgsAndOverrides } from './utils';
import { projectHasTarget } from '../utils/project-graph-utils';

export async function runOne(opts: {
  project: string;
  target: string;
  configuration: string;
  parsedArgs: any;
}) {
  const { sinbixArgs, overrides } = splitArgsIntoSinbixArgsAndOverrides(
    {
      ...opts.parsedArgs,
      configuration: opts.configuration,
      target: opts.target,
    },
    'run-one'
  );

  const projectGraph = createProjectGraph();
  const { projects, projectsMap } = await getProjects(
    projectGraph,
    sinbixArgs.withDeps,
    opts.project,
    opts.target
  );
  const env = readEnvironment(opts.target, projectsMap);
  const reporter = sinbixArgs.withDeps
    ? new ((await import(`@sinbix/core/src/tasks-runner/run-one-reporter`)).RunOneReporter)(
        opts.project
      )
    : new EmptyReporter();

  await runCommand(
    projects,
    projectGraph,
    env,
    sinbixArgs,
    overrides,
    reporter,
    opts.project
  );
}

async function getProjects(
  projectGraph: ProjectGraph,
  includeDeps: boolean,
  project: string,
  target: string
): Promise<any> {
  const projects = [projectGraph.nodes[project]];
  const projectsMap = {
    [project]: projectGraph.nodes[project],
  };

  if (includeDeps) {
    const s = await import(`@sinbix/core/src/project-graph`);
    const deps = s.onlyWorkspaceProjects(s.withDeps(projectGraph, projects))
      .nodes;
    const projectsWithTarget = Object.values(deps).filter((p: any) =>
      projectHasTarget(p, target)
    );
    return {
      projects: projectsWithTarget,
      projectsMap: deps,
    };
  } else {
    return { projects, projectsMap };
  }
}
