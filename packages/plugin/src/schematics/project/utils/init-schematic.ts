import { NormalizedOptions } from './models';
import { chain, noop, schematic } from '@angular-devkit/schematics';

export function initSchematic(options: NormalizedOptions) {
  return chain([
    !options.skipInit
      ? schematic('schematic', {
          project: options.projectName,
          name: options.projectName,
          unitTestRunner: options.unitTestRunner,
        })
      : noop(),
  ]);
}
