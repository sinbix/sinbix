import {
  apply,
  applyTemplates,
  chain,
  mergeWith, move,
  Tree,
  url
} from "@angular-devkit/schematics";
import { NormalizedOptions } from './models';
import { offsetFromRoot, updateWorkspaceInTree } from '@sinbix/common';
import { JsonArray } from '@angular-devkit/core';

export function initCollection(options: NormalizedOptions) {
  return (host: Tree) => {
    if (!host.exists(`${options.projectRoot}/collection.json`)) {
      return chain([
        mergeWith(
          apply(url('./files-init'), [
            applyTemplates({
              ...options,
              offsetFromRoot: offsetFromRoot(options.projectRoot),
            }),
            move(options.projectRoot),
          ])
        ),
        updateWorkspaceProject(options),
      ]);
    }
  };
}

export function updateWorkspaceProject(options: NormalizedOptions) {
  return updateWorkspaceInTree((workspace) => {
    const build = workspace.projects[options.project].architect['build-base'];

    if (build) {
      (build.options.assets as JsonArray).push(
        ...[
          {
            input: `./${options.projectRoot}`,
            glob: 'collection.json',
            output: '.',
          },
        ]
      );
    }

    return workspace;
  });
}
