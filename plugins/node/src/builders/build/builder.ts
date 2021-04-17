import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { from, Observable } from 'rxjs';
import { workspaces } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { createProjectGraph } from '@sinbix/core/project-graph';
import { calculateProjectDependencies, createTmpTsConfig } from '@sinbix/core/plugin-utils';
import { join, resolve } from 'path';
import { concatMap, map, tap } from 'rxjs/operators';
import { runWebpack, BuildResult } from '@angular-devkit/build-webpack';

import {
  BuildBuilderOptions,
  generatePackageJson,
  getNodeWebpackConfig,
  normalizeOptions,
  OUT_FILENAME,
} from './utils';
import { NodeBuildEvent } from '../../utils';

export function runBuilder(
  options: BuildBuilderOptions,
  context: BuilderContext
): Observable<BuilderOutput> {
  const projGraph = createProjectGraph();
  if (!options.buildLibsFromSource) {
    const { target, dependencies } = calculateProjectDependencies(
      projGraph,
      context
    );
    options.tsConfig = createTmpTsConfig(
      join(context.workspaceRoot, options.tsConfig),
      context.workspaceRoot,
      target.data.root,
      dependencies
    );
  }

  return from(getRoots(context)).pipe(
    map(({ sourceRoot, projectRoot }) =>
      normalizeOptions(options, context.workspaceRoot, sourceRoot, projectRoot)
    ),
    tap((normalizedOptions) => {
      if (normalizedOptions.generatePackageJson) {
        generatePackageJson(
          context.target.project,
          projGraph,
          normalizedOptions
        );
      }
    }),
    map((options) => {
      let config = getNodeWebpackConfig(options);
      if (options.webpackConfig) {
        config = require(options.webpackConfig)(config, {
          options,
          configuration: context.target.configuration,
        });
      }
      return config;
    }),
    concatMap((config) =>
      //@ts-ignore
      runWebpack(config, context, {
        logging: (stats) => {
          context.logger.info(stats.toString(config.stats));
        },
        webpackFactory: require('webpack'),
      })
    ),
    map((buildEvent: BuildResult) => {
      buildEvent.outfile = resolve(
        context.workspaceRoot,
        options.outputPath,
        OUT_FILENAME
      );
      return buildEvent as NodeBuildEvent;
    })
  );
}

//@ts-ignore
export default createBuilder(runBuilder);

async function getRoots(
  context: BuilderContext
): Promise<{ sourceRoot: string; projectRoot: string }> {
  const workspaceHost = workspaces.createWorkspaceHost(new NodeJsSyncHost());
  const { workspace } = await workspaces.readWorkspace(
    context.workspaceRoot,
    workspaceHost
  );
  const project = workspace.projects.get(context.target.project);
  if (project.sourceRoot && project.root) {
    return { sourceRoot: project.sourceRoot, projectRoot: project.root };
  } else {
    context.reportStatus('Error');
    const message = `${context.target.project} does not have a sourceRoot or root. Please define one.`;
    context.logger.error(message);
    throw new Error(message);
  }
}
