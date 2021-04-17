import { NormalizedOptions } from './models';
import { chain, Tree } from '@angular-devkit/schematics';
import {
  getProjectConfig,
  updateJsonInTree,
  updateWorkspaceInTree,
} from '@sinbix/core/plugin-utils';
import { JsonArray } from '@angular-devkit/core';
import { join } from 'path';

export function initPlugin(options: NormalizedOptions) {
  return chain([updateWorkspaceProject(options), updatePackageJson(options)]);
}

function updateWorkspaceProject(options: NormalizedOptions) {
  return (host: Tree) => {
    const projectConfig = getProjectConfig(host, options.projectName);

    return updateWorkspaceInTree((workspace) => {
      const build =
        workspace.projects[options.projectName].architect['build-base'];

      if (build) {
        (build.options.assets as JsonArray).push(
          ...[
            {
              input: `./${options.projectRoot}/schematics`,
              glob: '**/*.!(ts)',
              output: './schematics',
            },
            {
              input: `./${options.projectRoot}/builders`,
              glob: '**/*.!(ts)',
              output: './builders',
            },
            {
              input: `./${options.projectRoot}`,
              glob: 'collection.json',
              output: '.',
            },
            {
              input: `./${options.projectRoot}`,
              glob: 'builders.json',
              output: '.',
            },
          ]
        );
      }

      return workspace;
    });
  };
}

function updatePackageJson(options: NormalizedOptions) {
  return updateJsonInTree(join(options.projectRoot, 'package.json'), (json) => {
    json.schematics = './collection.json';
    json.buiders = './builders.json';
    if (json) return json;
  });
}
