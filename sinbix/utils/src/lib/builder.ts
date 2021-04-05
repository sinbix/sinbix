import { normalize, virtualFs } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { HostTree } from '@angular-devkit/schematics';
import { BuilderContext } from '@angular-devkit/architect';
import { getProjectGraphFromHost } from './ast-utils';

export function createHost(workspaceRoot: string) {
  return new HostTree(
    new virtualFs.ScopedHost(new NodeJsSyncHost(), normalize(workspaceRoot))
  );
}

export function createBuilderHost(context: BuilderContext) {
  return createHost(context.workspaceRoot);
}

export function getBuilderProjectData(context: BuilderContext) {
  return getProjectGraphFromHost(createBuilderHost(context))?.nodes[
    context.target?.project
  ]?.data;
}
