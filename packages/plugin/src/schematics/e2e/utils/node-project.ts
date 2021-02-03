import { NormalizedOptions } from './models';
import { chain, externalSchematic } from '@angular-devkit/schematics';

export function nodeProject(options: NormalizedOptions) {
  return chain([
    externalSchematic('@sinbix/node', 'project', {
      name: options.projectRoot,
      directory: '',
      tags: [...options.projectTags].join(','),
      type: 'application',
      sourceRoot: 'src',
    }),
  ]);
}
