import {
  chain,
  externalSchematic,
  Rule,
  Tree,
} from '@angular-devkit/schematics';

import { addFiles, normalizeOptions, ProjectSchematicOptions } from './utils';

export default function (options: ProjectSchematicOptions): Rule {
  return (host: Tree) => {
    const normalizedOptions = normalizeOptions(host, options);
    return chain([
      externalSchematic('@sinbix/common', 'project', {
        name: normalizedOptions.projectRoot,
        directory: '',
        tags: normalizedOptions.projectTags.join(','),
        type: normalizedOptions.type
      }),
      addFiles(normalizedOptions),
    ]);
  };
}
