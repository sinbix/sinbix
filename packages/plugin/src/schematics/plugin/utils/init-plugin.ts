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
    json.peerDependencies = {
      '@sinbix/core': sinbixVersion,
      '@sinbix/common': sinbixVersion,
    };

    json.version = sinbixVersion;

    return json;
  });
}
