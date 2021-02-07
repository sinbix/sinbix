import { join } from '@angular-devkit/core';
import { Rule, Tree } from '@angular-devkit/schematics';
import { updateJsonInTree } from '@sinbix/utils';
import { NormalizedOptions } from './models';

export function updateTsConfig(options: NormalizedOptions): Rule {
  return (host: Tree) => {
    const projectConfig = options.projectConfig;
    if (!host.exists(join(projectConfig.root, 'tsconfig.json'))) {
      throw new Error(
        `Expected ${join(
          projectConfig.root,
          'tsconfig.json'
        )} to exist. Please create one.`
      );
    }
    return updateJsonInTree(
      join(projectConfig.root, 'tsconfig.json'),
      (json) => {
        if (json.references) {
          json.references.push({
            path: './tsconfig.spec.json',
          });
        }
        return json;
      }
    );
  };
}
