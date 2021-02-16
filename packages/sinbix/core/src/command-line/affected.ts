import * as yargs from 'yargs';
import { generateGraph } from './dep-graph';
import { output } from '../utils/output';
import { parseFiles } from './shared';
import { runCommand } from '../tasks-runner/run-command';
import { SinbixArgs, splitArgsIntoSinbixArgsAndOverrides, RawSinbixArgs } from './utils';
import { filterAffected } from '../affected-project-graph';
import {
  createProjectGraph,
  onlyWorkspaceProjects,
  ProjectGraphNode,
  ProjectType,
  withDeps,
} from '../project-graph';
import { calculateFileChanges, readEnvironment } from '../file-utils';
import { printAffected } from './print-affected';
import { projectHasTarget } from '../utils/project-graph-utils';
import { DefaultReporter } from '../tasks-runner/default-reporter';

export async function affected(
  command: 'apps' | 'libs' | 'dep-graph' | 'print-affected' | 'affected',
  parsedArgs: yargs.Arguments & RawSinbixArgs
) {
  const { sinbixArgs, overrides } = splitArgsIntoSinbixArgsAndOverrides(
    parsedArgs,
    'affected',
    {
      printWarnings: command !== 'print-affected' && !parsedArgs.plain,
    }
  );

  const projectGraph = createProjectGraph();
  let affectedGraph = sinbixArgs.all
    ? projectGraph
    : filterAffected(
        projectGraph,
        calculateFileChanges(parseFiles(sinbixArgs).files, sinbixArgs)
      );
  if (parsedArgs.withDeps) {
    affectedGraph = onlyWorkspaceProjects(
      withDeps(projectGraph, Object.values(affectedGraph.nodes))
    );
  }
  const projects = parsedArgs.all ? projectGraph.nodes : affectedGraph.nodes;
  const env = readEnvironment(sinbixArgs.target, projects);
  const affectedProjects = Object.values(projects)
    .filter((n) => !parsedArgs.exclude.includes(n.name))
    .filter(
      (n) => !parsedArgs.onlyFailed || !env.workspaceResults.getResult(n.name)
    );

  try {
    switch (command) {
      case 'apps':
        const apps = affectedProjects
          .filter((p) => p.type === ProjectType.app)
          .map((p) => p.name);
        if (parsedArgs.plain) {
          console.log(apps.join(' '));
        } else {
          if (apps.length) {
            output.log({
              title: 'Affected apps:',
              bodyLines: apps.map((app) => `${output.colors.gray('-')} ${app}`),
            });
          }
        }
        break;

      case 'libs':
        const libs = affectedProjects
          .filter((p) => p.type === ProjectType.lib)
          .map((p) => p.name);
        if (parsedArgs.plain) {
          console.log(libs.join(' '));
        } else {
          if (libs.length) {
            output.log({
              title: 'Affected libs:',
              bodyLines: libs.map((lib) => `${output.colors.gray('-')} ${lib}`),
            });
          }
        }
        break;

      case 'dep-graph':
        const projectNames = affectedProjects.map((p) => p.name);
        generateGraph(parsedArgs as any, projectNames);
        break;

      case 'print-affected':
        if (sinbixArgs.target) {
          const projectsWithTarget = allProjectsWithTarget(
            affectedProjects,
            sinbixArgs
          );
          printAffected(
            projectsWithTarget,
            affectedProjects,
            projectGraph,
            sinbixArgs,
            overrides
          );
        } else {
          printAffected([], affectedProjects, projectGraph, sinbixArgs, overrides);
        }
        break;

      case 'affected': {
        const projectsWithTarget = allProjectsWithTarget(
          affectedProjects,
          sinbixArgs
        );
        runCommand(
          projectsWithTarget,
          projectGraph,
          env,
          sinbixArgs,
          overrides,
          new DefaultReporter(),
          null
        );
        break;
      }
    }
  } catch (e) {
    printError(e, parsedArgs.verbose);
    process.exit(1);
  }
}

function allProjectsWithTarget(projects: ProjectGraphNode[], nxArgs: SinbixArgs) {
  return projects.filter((p) => projectHasTarget(p, nxArgs.target));
}

function printError(e: any, verbose?: boolean) {
  const bodyLines = [e.message];
  if (verbose && e.stack) {
    bodyLines.push('');
    bodyLines.push(e.stack);
  }
  output.error({
    title: 'There was a critical error when running your command',
    bodyLines,
  });
}
