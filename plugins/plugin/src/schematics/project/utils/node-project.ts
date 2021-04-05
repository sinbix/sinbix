import { NormalizedOptions } from './models';
import { chain, externalSchematic } from '@angular-devkit/schematics';

export function nodeProject(options: NormalizedOptions) {
  return chain([
    externalSchematic('@sinbix/node', 'library', {
      ...options,
      name: options.projectRoot,
      directory: '',
      tags: ['plugin', ...options.projectTags].join(','),
      publishable: true,
    }),
  ]);
}
