import { externalSchematic, noop } from '@angular-devkit/schematics';
import { normalizeProjectName } from '@sinbix/common';
import { LibrarySchematicOptions } from './models';

export function addLint(options: LibrarySchematicOptions) {
  return options.linter === 'eslint'
    ? externalSchematic('@sinbix/node', 'lint', {
        project: normalizeProjectName(options.name),
      })
    : noop;
}
