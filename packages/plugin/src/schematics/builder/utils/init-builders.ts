import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { NormalizedOptions } from './models';
import {
  offsetFromRoot,
  updateJsonInTree,
  updateWorkspaceInTree,
} from '@sinbix/common';
import { JsonArray } from '@angular-devkit/core';
import { join } from 'path';

export function initBuilders(options: NormalizedOptions) {
  return (host: Tree) => {
    const projectRoot = options.projectConfig.root;
    if (!host.exists(`${projectRoot}/builders.json`)) {
      return chain([
        mergeWith(
          apply(url('./files-init'), [
            applyTemplates({
              ...options,
              offsetFromRoot: offsetFromRoot(projectRoot),
            }),
            move(projectRoot),
          ])
        ),
        updatePackageJson(options),
        updateWorkspaceProject(options),
      ]);
    }
  };
}

function updateWorkspaceProject(options: NormalizedOptions) {
  return updateWorkspaceInTree((workspace) => {
    const build = workspace.projects[options.project].architect['build-base'];

    if (build) {
      (build.options.assets as JsonArray).push(
        ...[
          {
            input: `./${options.projectConfig.root}`,
            glob: 'builders.json',
            output: '.',
          },
        ]
      );
    }

    return workspace;
  });
}

function updatePackageJson(options: NormalizedOptions) {
  return updateJsonInTree(
    join(options.projectConfig.root, 'package.json'),
    (json) => {
      const builders = 'schematics';
      if (!json[builders]) {
        json[builders] = './collection.json';
      }
      if (json) return json;
    }
  );
}
