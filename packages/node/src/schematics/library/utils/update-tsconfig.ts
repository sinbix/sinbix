import { join } from '@angular-devkit/core';
import {
  noop,
  Rule,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import {
  getProjectConfig,
  normalizeProjectName,
  updateJsonInTree,
} from '@sinbix/common';
import { LibrarySchematicOptions } from './models';

export function updateTsConfig(options: LibrarySchematicOptions): Rule {
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

export function updateTsBaseConfig(options: LibrarySchematicOptions): Rule {
  return (host: Tree) => {
    return !options.skipImport
      ? updateJsonInTree('tsconfig.base.json', (json) => {
          const projectConfig = getProjectConfig(
            host,
            normalizeProjectName(options.name)
          );

          const c = json.compilerOptions;
          c.paths = c.paths || {};
          delete c.paths[options.name];

          if (c.paths[options.importPath]) {
            throw new SchematicsException(
              `You already have a library using the import path "${options.importPath}". Make sure to specify a unique one.`
            );
          }

          c.paths[options.importPath] = [`${projectConfig.root}/src/index.ts`];

          return json;
        })
      : noop();
  };
}
