import { NormalizedOptions } from './models';
import { chain, Tree } from '@angular-devkit/schematics';
import {
  getProjectConfig,
  updateJsonInTree,
  updateWorkspaceInTree,
} from '@sinbix/common';
import { join } from 'path';
import { sinbixVersion } from '@sinbix/core/versions';
import { JsonArray } from '@angular-devkit/core';

export function initPlugin(options: NormalizedOptions) {
  return chain([updatePackageJson(options), updateWorkspaceProject(options)]);
}

function updatePackageJson(options: NormalizedOptions) {
  return updateJsonInTree(join(options.projectRoot, 'package.json'), (json) => {
    json.peerDependencies = {
      '@sinbix/core': sinbixVersion,
      '@sinbix/common': sinbixVersion,
    };

    json.version = sinbixVersion;

    return json;
  });
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
              input: `./${projectConfig.sourceRoot}`,
              glob: '**/*.!(ts)',
              output: './src',
            },
          ]
        );
      }

      return workspace;
    });
  };
}
