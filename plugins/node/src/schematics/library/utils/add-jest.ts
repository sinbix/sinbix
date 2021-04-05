import { chain, externalSchematic, noop } from '@angular-devkit/schematics';
import { NormalizedOptions } from './models';

export function addJest(options: NormalizedOptions) {
  return options.unitTestRunner === 'jest'
    ? chain([
        externalSchematic('@sinbix/node', 'jest', {
          project: options.projectName,
          setupFile: 'none',
          supportTsx: true,
          skipSerializers: true,
          testEnvironment: options.testEnvironment,
          testTimeout: options.testTimeout,
        }),
      ])
    : noop();
}
