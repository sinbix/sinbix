import { join } from '@angular-devkit/core';
import { Rule, Tree } from '@angular-devkit/schematics';
import {
  getProjectConfig,
  normalizeProjectName,
  updateJsonInTree,
} from '@sinbix/common';
import { LibrarySchematicSchema } from '../schema';

export function updateTsConfig(options: LibrarySchematicSchema): Rule {
  return (host: Tree) => {
    const projectConfig = getProjectConfig(
      host,
      normalizeProjectName(options.name)
    );
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
            path: './tsconfig.lib.json',
          });
        }
        return json;
      }
    );
  };
}
