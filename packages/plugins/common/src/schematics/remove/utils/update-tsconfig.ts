import { Tree } from '@angular-devkit/schematics';
import { getNpmScope, getProjectConfig, updateJsonInTree } from '@sinbix/utils';
import { NormalizedOptions } from './models';
import * as _ from 'lodash';

export function updateTsconfig(options: NormalizedOptions) {
  return (host: Tree) => {
    const project = getProjectConfig(host, options.projectName);

    return updateJsonInTree('tsconfig.base.json', (json) => {
      const c = json.compilerOptions;
      const paths = c.paths || {};

      const importPath = `@${getNpmScope(host)}/${project.root}`;

      _.keys(paths)
        .filter(
          (path) =>
            new RegExp(`${importPath}`).test(path) ||
            new RegExp(`${importPath}/*`).test(path)
        )
        .forEach((path) => {
          delete c.paths[path];
        });

      // delete c.paths[`@${getNpmScope(host)}/${project.root}`];

      return json;
    });
  };
}
