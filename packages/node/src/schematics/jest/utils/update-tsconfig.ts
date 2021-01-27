import { join } from '@angular-devkit/core';
import { Rule, Tree } from '@angular-devkit/schematics';
import { getProjectConfig, updateJsonInTree } from '@sinbix/common';
import { JestSchematicOptions } from './models';

export function updateTsConfig(options: JestSchematicOptions): Rule {
  return (host: Tree) => {
    const projectConfig = getProjectConfig(host, options.project);
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
