import { NormalizedOptions } from './models';
import { chain, noop, schematic } from '@angular-devkit/schematics';

export function e2eProject(options: NormalizedOptions) {
  return chain([
    options.unitTestRunner === 'jest'
      ? schematic('e2e', {
          pluginName: options.projectName,
          npmPackageName: options.importPath,
          pluginOutputPath: `dist/${options.projectRoot}`,
        })
      : noop(),
  ]);
}
