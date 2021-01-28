import { NormalizedOptions } from './models';
import { chain } from '@angular-devkit/schematics';
import { updateJsonInTree } from '@sinbix/common';
import { join } from 'path';
import { sinbixVersion } from '@sinbix/core/versions';

export function initPlugin(options: NormalizedOptions) {
  return chain([updatePackageJson(options)]);
}

function updatePackageJson(options: NormalizedOptions) {
  return updateJsonInTree(join(options.projectRoot, 'package.json'), (json) => {
    const setPeerDependencies = (dependency: string) => {
      const peerDependencies = json.peerDependencies;
      if (!peerDependencies?.[dependency] && !json.dependencies?.[dependency]) {
        peerDependencies[dependency] = sinbixVersion;
      }
    };

    const core = '@sinbix/core';
    const common = '@sinbix/common';

    setPeerDependencies(core);
    setPeerDependencies(common);

    json.version = sinbixVersion;

    return json;
  });
}
