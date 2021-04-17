import { Tree } from '@angular-devkit/schematics';
import { getProjectConfig, updateJsonInTree } from '@sinbix/core/plugin-utils';
import { NormalizedOptions } from './models';
import * as _ from 'lodash';

export function updateTsconfig(options: NormalizedOptions) {
  return (host: Tree) => {
    const project = getProjectConfig(host, options.projectName);

    return updateJsonInTree('tsconfig.base.json', (json) => {
      const c = json.compilerOptions;
      const paths = c.paths || {};

      _.keys(paths).forEach((alias) => {
        const value = (paths[alias] as string[]).filter(
          (path) => !new RegExp(`^${project.root}`).test(path)
        );

        if (paths[alias].length === value.length) {
          return;
        }

        if (value.length > 0) {
          paths[alias] = value;
        } else {
          delete paths[alias];
        }
      });

      return json;
    });
  };
}
