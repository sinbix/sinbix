import { NormalizedOptions } from './models';
import { chain, noop, schematic } from '@angular-devkit/schematics';

export function initBuilder(options: NormalizedOptions) {
  return chain([
    !options.skipInit
      ? schematic('builder', {
          project: options.projectName,
          name: options.projectName,
          unitTestRunner: options.unitTestRunner,
        })
      : noop(),
  ]);
}
