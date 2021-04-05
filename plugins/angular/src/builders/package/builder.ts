import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { from, Observable, of } from 'rxjs';
import { mapTo, switchMap, tap } from 'rxjs/operators';
import {
  calculateProjectDependencies,
  checkDependentProjectsHaveBeenBuilt,
  DependentBuildableProjectNode,
  updateBuildableProjectPackageJsonDependencies,
  updatePaths,
} from '@sinbix/utils';
import { PackageBuilderOptions } from './utils';
import { createProjectGraph } from '@sinbix/core/src/project-graph';
import { JsonObject } from '@angular-devkit/core';
import { resolve } from 'path';
import * as ng from '@angular/compiler-cli';

async function initializeNgPackagr(
  options: PackageBuilderOptions & JsonObject,
  context: BuilderContext,
  projectDependencies: DependentBuildableProjectNode[]
): Promise<import('ng-packagr').NgPackagr> {
  const packager = (await import('ng-packagr')).ngPackagr();
  packager.forProject(resolve(context.workspaceRoot, options.project));

  if (options.tsConfig) {
    // read the tsconfig and modify its path in memory to
    // pass it on to ngpackagr
    const parsedTSConfig = ng.readConfiguration(options.tsConfig);
    updatePaths(projectDependencies, parsedTSConfig.options.paths);
    packager.withTsConfig(parsedTSConfig);
  }

  return packager;
}

export function runBuilder(
  initializeNgPackagr: (
    options: PackageBuilderOptions & JsonObject,
    context: BuilderContext,
    projectDependencies: DependentBuildableProjectNode[]
  ) => Promise<import('ng-packagr').NgPackagr>
) {
  return function run(
    options: PackageBuilderOptions & JsonObject,
    context: BuilderContext
  ): Observable<BuilderOutput> {
    const projGraph = createProjectGraph();
    const { target, dependencies } = calculateProjectDependencies(
      projGraph,
      context
    );
    return of(checkDependentProjectsHaveBeenBuilt(context, dependencies)).pipe(
      switchMap((result) => {
        if (result) {
          return from(initializeNgPackagr(options, context, dependencies)).pipe(
            switchMap((packager) =>
              options.watch ? packager.watch() : packager.build()
            ),
            tap(() => {
              if (
                dependencies.length > 0 &&
                options.updateBuildableProjectDepsInPackageJson
              ) {
                updateBuildableProjectPackageJsonDependencies(
                  context,
                  target,
                  dependencies
                );
              }
            }),
            mapTo({ success: true })
          );
        } else {
          // just pass on the result
          return of({ success: false });
        }
      })
    );
  };
}

//@ts-ignore
export default createBuilder<Record<string, string> & any>(
  runBuilder(initializeNgPackagr)
);
