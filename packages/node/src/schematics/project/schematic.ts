import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';

import { addFiles, ProjectSchematicOptions } from './utils';

export default function (options: ProjectSchematicOptions): Rule {
  return chain([
    externalSchematic('@sinbix/common', 'project', options),
    addFiles(options),
  ]);
}
