import {
  apply,
  chain,
  externalSchematic,
  filter,
  MergeStrategy,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicsException,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';

import { LibrarySchematicSchema } from './schema';
import {
  formatFiles,
  getNpmScope,
  getProjectConfig,
  names,
  normalizeProjectName,
  offsetFromRoot,
  ProjectType,
  toFileName,
  updateJsonInTree,
} from '@sinbix/common';
import { ProjectSchematicSchema } from '../project/schema';
import { updateTsConfig } from './utils';

function normalizeOptions(
  host: Tree,
  options: LibrarySchematicSchema
): LibrarySchematicSchema {
  const defaultPrefix = getNpmScope(host);
  const name = toFileName(options.name);
  const projectDirectory = options.directory
    ? `${toFileName(options.directory)}/${name}`
    : name;

  const importPath =
    options.importPath || `@${defaultPrefix}/${projectDirectory}`;

  return {
    ...options,
    importPath,
  };
}

function addNodeProject(options: LibrarySchematicSchema) {
  return externalSchematic('@sinbix/node', 'project', {
    name: options.name,
    directory: options.directory,
    tags: options.tags,
    type: ProjectType.Library,
    sourceRoot: 'src',
    testEnvironment: options.testEnvironment,
  });
}

function addLint(options: ProjectSchematicSchema) {
  return externalSchematic('@sinbix/node', 'lint', {
    project: normalizeProjectName(options.name),
  });
}

function addJest(options: ProjectSchematicSchema) {
  return chain([
    externalSchematic('@sinbix/node', 'jest', {
      project: normalizeProjectName(options.name),
      setupFile: 'none',
      supportTsx: true,
      skipSerializers: true,
      testEnvironment: options.testEnvironment,
    }),
  ]);
}

function addFiles(options: LibrarySchematicSchema): Rule {
  return (host: Tree) => {
    const projectConfig = getProjectConfig(
      host,
      normalizeProjectName(options.name)
    );
    return mergeWith(
      apply(url(`./files`), [
        template({
          ...options,
          ...names(options.name),
          tmpl: '',
          offsetFromRoot: offsetFromRoot(projectConfig.root),
        }),
        move(projectConfig.root),
        options.unitTestRunner === 'none'
          ? filter((file) => !file.endsWith('spec.ts'))
          : noop(),
        options.publishable
          ? noop()
          : filter((file) => !file.endsWith('package.json')),
      ]),
      MergeStrategy.Overwrite
    );
  };
}

function updateTsBaseConfig(options: LibrarySchematicSchema): Rule {
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

export default function (options: LibrarySchematicSchema): Rule {
  return (host: Tree) => {
    options = normalizeOptions(host, options);

    if (options.publishable && !options.importPath) {
      throw new SchematicsException(
        `For publishable libs you have to provide a proper "--importPath" which needs to be a valid npm package name (e.g. my-awesome-lib or @myorg/my-lib)`
      );
    }

    return chain([
      addNodeProject(options),
      addLint(options),
      addJest(options),
      addFiles(options),
      updateTsConfig(options),
      updateTsBaseConfig(options),
      formatFiles(),
    ]);
  };
}
