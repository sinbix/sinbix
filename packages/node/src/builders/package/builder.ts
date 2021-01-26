import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { createProjectGraph } from '@sinbix/core/src/project-graph';

import {
  calculateProjectDependencies,
  checkDependentProjectsHaveBeenBuilt,
  getProjectGraphFromHost,
  updateBuildableProjectPackageJsonDependencies,
} from '@sinbix/common';

import {
  compileTypeScriptFiles,
  copyAssetFiles,
  normalizeOptions,
  PackageBuilderOptions,
  updatePackageJson,
} from './utils';
import { HostTree } from '@angular-devkit/schematics';
import { normalize, virtualFs } from "@angular-devkit/core";
import { NodeJsSyncHost } from '@angular-devkit/core/node';

export function runBuilder(
  options: PackageBuilderOptions,
  context: BuilderContext
): Observable<BuilderOutput> {

  const host = new HostTree(
    new virtualFs.ScopedHost(new NodeJsSyncHost(), normalize(context.workspaceRoot))
  );

  // throw new Error(JSON.stringify(getProjectGraphFromHost(host), null, 2));

  // process.env.NX_WORKSPACE_ROOT_PATH = context.workspaceRoot;

  // const path1 = process.env.NX_WORKSPACE_ROOT_PATH;
  //
  // process.env.NX_WORKSPACE_ROOT_PATH = context.workspaceRoot;
  //
  // const path2 = process.env.NX_WORKSPACE_ROOT_PATH;

  // throw new Error(`${path1} & ${path2}`);

  const projGraph = getProjectGraphFromHost(host);

  // throw new Error(JSON.stringify(projGraph, null, 2));

  // const project = context.target.project;
  // throw new Error(
  //   JSON.stringify(
  //     { project, target: context.target, node: projGraph.nodes[context.target.project] },
  //     null,
  //     2
  //   )
  // );
  const libRoot = projGraph.nodes[context.target.project].data.root;

  const normalizedOptions = normalizeOptions(options, context, libRoot);
  const { target, dependencies } = calculateProjectDependencies(
    projGraph,
    context
  );

  return of(checkDependentProjectsHaveBeenBuilt(context, dependencies)).pipe(
    switchMap((result) => {
      if (result) {
        return compileTypeScriptFiles(
          normalizedOptions,
          context,
          libRoot,
          dependencies
        ).pipe(
          tap(() => {
            updatePackageJson(normalizedOptions, context);
            if (
              dependencies.length > 0 &&
              options.updateBuildableProjectDepsInPackageJson
            ) {
              updateBuildableProjectPackageJsonDependencies(
                context,
                target,
                dependencies,
                normalizedOptions.buildableProjectDepsInPackageJsonType
              );
            }
          }),
          switchMap(() => copyAssetFiles(normalizedOptions, context))
        );
      } else {
        return of({ success: false });
      }
    }),
    map((value) => {
      return {
        ...value,
        outputPath: normalizedOptions.outputPath,
      };
    })
  );
}

export default createBuilder(runBuilder);
