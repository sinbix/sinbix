import { NormalizedOptions } from './models';
import { Rule, Tree } from '@angular-devkit/schematics';
import { addPropertyToJestConfig } from '../../../utils';

export function updateJestConfig(options: NormalizedOptions): Rule {
  return (host: Tree) => {
    // addPropertyToJestConfig(
    //   host,
    //   'jest.config.js',
    //   'projects',
    //   `<rootDir>/${options.projectConfig.root}`
    // );
  };
}
