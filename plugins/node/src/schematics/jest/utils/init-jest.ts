import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { addDepsToPackageJson } from '@sinbix/core/plugin-utils';
import { jestTypesVersion, jestVersion, tsJestVersion } from '../../../utils';

export function initJest() {
  return (host: Tree) => {
    if (!host.exists('/jest.config.js')) {
      return chain([
        addDepsToPackageJson(
          {},
          {
            jest: jestVersion,
            '@types/jest': jestTypesVersion,
            'ts-jest': tsJestVersion,
          }
        ),
        mergeWith(
          apply(url('./files-init'), [
            applyTemplates({
              dot: '.',
            }),
          ])
        ),
      ]);
    }
  };
}
