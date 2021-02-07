import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { HostTree } from '@angular-devkit/schematics';
import { normalize, virtualFs } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  calculateProjectDependencies,
  checkDependentProjectsHaveBeenBuilt,
  getProjectGraphFromHost,
  updateBuildableProjectPackageJsonDependencies,
} from '@sinbix/utils';
import {
  compileTypeScriptFiles,
  copyAssetFiles,
  normalizeOptions,
  PackageBuilderOptions,
  updatePackageJson,
} from './utils';

export function runBuilder(
  options: PackageBuilderOptions,
  context: BuilderContext
): Observable<BuilderOutput> {
  const host = new HostTree(
    new virtualFs.ScopedHost(
      new NodeJsSyncHost(),
      normalize(context.workspaceRoot)
    )
  );

  const projGraph = getProjectGraphFromHost(host);

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
