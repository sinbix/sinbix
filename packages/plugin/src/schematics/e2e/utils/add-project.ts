import { NormalizedOptions } from './models';
import { chain, externalSchematic } from '@angular-devkit/schematics';

export function addProject(options: NormalizedOptions) {
  return chain([
    externalSchematic('@sinbix/node', 'project', {
      name: `${options.e2eDirectory}/${options.pluginName}`,
      type: 'application',
      sourceRoot: 'src',
    }),
  ]);
}
