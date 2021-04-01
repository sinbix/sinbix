import { Tree } from '@angular-devkit/schematics';
import { serializeJson, SinbixJson } from '@sinbix/core';
import { getProjectConfig, readJsonInTree } from '@sinbix/utils';
import { NormalizedOptions } from './models';

/**
 * Updates the tsconfig paths to remove the project.
 *
 * @param options The options provided to the schematic
 */
export function updateTsconfig(options: NormalizedOptions) {
  return (host: Tree) => {
    const sinbix = readJsonInTree<SinbixJson>(host, 'sinbix.json');

    const project = getProjectConfig(host, options.projectName);

    const tsConfigPath = 'tsconfig.base.json';
    if (host.exists(tsConfigPath)) {
      const tsConfigJson = readJsonInTree(host, tsConfigPath);
      delete tsConfigJson.compilerOptions.paths[
        `@${sinbix.npmScope}/${project.root.substr(5)}`
      ];
      host.overwrite(tsConfigPath, serializeJson(tsConfigJson));
    }
  };
}
