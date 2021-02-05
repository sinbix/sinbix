import {
  noop,
  Rule,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { getProjectConfig, updateJsonInTree } from '@sinbix/common';
import { NormalizedOptions } from './models';
import { join } from 'path';

export function updateTsConfig(options: NormalizedOptions): Rule {
  return (host: Tree) => {
    if (!host.exists(join(options.projectRoot, 'tsconfig.json'))) {
      throw new Error(
        `Expected ${join(
          options.projectRoot,
          'tsconfig.json'
        )} to exist. Please create one.`
      );
    }
    return updateJsonInTree(
      join(options.projectRoot, 'tsconfig.json'),
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

export function updateTsBaseConfig(options: NormalizedOptions): Rule {
  return !options.skipImport
    ? updateJsonInTree('tsconfig.base.json', (json) => {
        const c = json.compilerOptions;
        c.paths = c.paths || {};
        delete c.paths[options.name];

        if (c.paths[options.importPath]) {
          throw new SchematicsException(
            `You already have a library using the import path "${options.importPath}". Make sure to specify a unique one.`
          );
        }

        c.paths[options.importPath] = [`${options.projectRoot}/src/index.ts`];

        return json;
      })
    : noop();
}
