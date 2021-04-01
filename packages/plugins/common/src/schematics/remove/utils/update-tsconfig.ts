import { Tree } from '@angular-devkit/schematics';
import { getNpmScope, getProjectConfig, updateJsonInTree } from '@sinbix/utils';
import { NormalizedOptions } from './models';

export function updateTsconfig(options: NormalizedOptions) {
  return (host: Tree) => {
    const project = getProjectConfig(host, options.projectName);

    return updateJsonInTree('tsconfig.base.json', (json) => {
      const c = json.compilerOptions;
      c.paths = c.paths || {};

      delete c.paths[`@${getNpmScope(host)}/${project.root}`];

      return json;
    });
  };
}
