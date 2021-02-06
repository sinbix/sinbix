import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { normalizeOptions, PatternSchematicOptions } from './utils';

export default function (options: PatternSchematicOptions): Rule {
  return (host: Tree) => {
    const normalizedOptions = normalizeOptions(host, options);

    return chain([
      externalSchematic('@sinbix/common', 'project', {
        name: normalizedOptions.name,
        directory: normalizedOptions.directory,
        tags: [...normalizedOptions.projectTags].join(','),
      }),
    ]);
  };
}
