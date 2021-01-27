import { chain, externalSchematic, noop } from '@angular-devkit/schematics';
import { normalizeProjectName } from '@sinbix/common';
import { LibrarySchematicOptions } from './models';

export function addJest(options: LibrarySchematicOptions) {
  return options.unitTestRunner === 'jest'
    ? chain([
        externalSchematic('@sinbix/node', 'jest', {
          project: normalizeProjectName(options.name),
          setupFile: 'none',
          supportTsx: true,
          skipSerializers: true,
          testEnvironment: options.testEnvironment,
        }),
      ])
    : noop();
}
