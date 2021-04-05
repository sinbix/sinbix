import { assertWorkspaceValidity } from '../assert-workspace-validity';
import { createFileMap, FileMap } from '../file-graph';
import {
  defaultFileRead,
  FileRead,
  filesChanged,
  readSinbixJson,
  readWorkspaceFiles,
  readWorkspaceJson,
  rootWorkspaceFileData,
} from '../file-utils';
import { normalizeSinbixJson } from '../normalize-sinbix-json';
import {
  BuildDependencies,
  buildExplicitTypeScriptDependencies,
  buildImplicitProjectDependencies,
} from './build-dependencies';
import {
  BuildNodes,
  buildNpmPackageNodes,
  buildWorkspaceProjectNodes,
} from './build-nodes';
import { ProjectGraphBuilder } from './project-graph-builder';
import { ProjectGraph } from './project-graph-models';
import {
  differentFromCache,
  ProjectGraphCache,
  readCache,
  writeCache,
} from '../sinbix-deps/sinbix-deps-cache';
import { SinbixJson } from '../shared-interfaces';
import { performance } from 'perf_hooks';

export function createProjectGraph(
  workspaceJson = readWorkspaceJson(),
  sinbixJson = readSinbixJson(),
  workspaceFiles = readWorkspaceFiles(),
  fileRead: FileRead = defaultFileRead,
  cache: false | ProjectGraphCache = readCache(),
  shouldCache = true
): ProjectGraph {
  assertWorkspaceValidity(workspaceJson, sinbixJson);
  const normalizedSinbixJson = normalizeSinbixJson(sinbixJson);

  const rootFiles = rootWorkspaceFileData();
  const fileMap = createFileMap(workspaceJson, workspaceFiles);

  if (cache && !filesChanged(rootFiles, cache.rootFiles)) {
    const diff = differentFromCache(fileMap, cache);
    if (diff.noDifference) {
      return diff.partiallyConstructedProjectGraph;
    }

    const ctx = {
      workspaceJson,
      sinbixJson: normalizedSinbixJson,
      fileMap: diff.filesDifferentFromCache,
    };
    const projectGraph = buildProjectGraph(
      ctx,
      fileRead,
      diff.partiallyConstructedProjectGraph
    );
    if (shouldCache) {
      writeCache(rootFiles, projectGraph);
    }
    return projectGraph;
  } else {
    const ctx = {
      workspaceJson,
      sinbixJson: normalizedSinbixJson,
      fileMap: fileMap,
    };
    const projectGraph = buildProjectGraph(ctx, fileRead, null);
    if (shouldCache) {
      writeCache(rootFiles, projectGraph);
    }
    return projectGraph;
  }
}

function buildProjectGraph(
  ctx: { sinbixJson: SinbixJson<string[]>; workspaceJson: any; fileMap: FileMap },
  fileRead: FileRead,
  projectGraph: ProjectGraph
) {
  performance.mark('build project graph:start');
  const builder = new ProjectGraphBuilder(projectGraph);
  const buildNodesFns: BuildNodes[] = [
    buildWorkspaceProjectNodes,
    buildNpmPackageNodes,
  ];
  const buildDependenciesFns: BuildDependencies[] = [
    buildExplicitTypeScriptDependencies,
    buildImplicitProjectDependencies,
  ];
  buildNodesFns.forEach((f) => f(ctx, builder.addNode.bind(builder), fileRead));
  buildDependenciesFns.forEach((f) =>
    f(ctx, builder.nodes, builder.addDependency.bind(builder), fileRead)
  );
  const r = builder.build();
  performance.mark('build project graph:end');
  performance.measure(
    'build project graph',
    'build project graph:start',
    'build project graph:end'
  );
  return r;
}
