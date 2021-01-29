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
      externalSchematic('@sinbix/common', 'project', options),
      addFiles(normalizedOptions),
    ]);
  };
}
