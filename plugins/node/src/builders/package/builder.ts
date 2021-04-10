import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  calculateProjectDependencies,
  checkDependentProjectsHaveBeenBuilt,
  createBuilderHost,
  getBuilderProjectData,
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
import { createProjectGraph } from '@sinbix/core/src/project-graph';

export function runBuilder(
  options: PackageBuilderOptions,
  context: BuilderContext
): Observable<BuilderOutput> {
  // const libRoot = getBuilderProjectData(context).root;

  // const normalizedOptions = normalizeOptions(options, context, libRoot);
  // const { target, dependencies } = calculateProjectDependencies(
  //   getProjectGraphFromHost(createBuilderHost(context)),
  //   context
  // );

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

//@ts-ignore
export default createBuilder(runBuilder);
