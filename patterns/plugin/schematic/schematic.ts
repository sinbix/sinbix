import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';
import { normalizeOptions, PatternSchematicOptions } from './utils';

export default function (options: PatternSchematicOptions): Rule {
  const normalizedOptions = normalizeOptions(options);
  return chain([
    externalSchematic('@sinbix/common', 'project', {
      name: normalizedOptions.name,
      directory: normalizedOptions.directory,
      tags: [...normalizedOptions.projectTags].join(','),
    }),
  ]);
}
