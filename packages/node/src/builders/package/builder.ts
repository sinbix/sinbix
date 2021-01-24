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
  updateBuildableProjectPackageJsonDependencies,
} from '@sinbix/common';

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
  const projGraph = createProjectGraph();
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
