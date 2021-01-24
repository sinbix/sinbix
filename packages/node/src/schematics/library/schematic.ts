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
  updateWorkspaceInTree,
} from '@sinbix/common';

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

function addLint(options: LibrarySchematicSchema) {
  return options.linter === 'eslint'
    ? externalSchematic('@sinbix/node', 'lint', {
        project: normalizeProjectName(options.name),
      })
    : noop;
}

function addJest(options: LibrarySchematicSchema) {
  return options.unitTestRunner === 'jest'
    ? chain([
        externalSchematic('@sinbix/node', 'jest', {
          project: normalizeProjectName(options.name),
          setupFile: 'none',
          supportTsx: true,
          skipSerializers: true,
          testEnvironment: options.testEnvironment,
        }),
      ])
    : noop();
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

function addBuildBuilder(options: LibrarySchematicSchema): Rule {
  return (host: Tree) => {
    const projectName = normalizeProjectName(options.name);

    const projectConfig = getProjectConfig(
      host,
      projectName
    );

    return options.publishable
      ? updateWorkspaceInTree((json) => {
          const targets = json.projects[projectName].targets;
          if (targets) {
            targets['build-base'] = {
              builder: '@sinbix/node:package',
              options: {
                outputPath: `dist/${projectConfig.root}`,
                tsConfig: `${projectConfig.root}/tsconfig.lib.json`,
                packageJson: `${projectConfig.root}/package.json`,
                main: `${projectConfig.root}/src/index.ts`,
                assets: [`${projectConfig.root}/*.md`],
              },
            };
            targets['build'] = {
              builder: '@sinbix/common:commands',
              outputs: [
                `dist/${projectConfig.root}`
              ],
              options: {
                commands: [
                  {
                    command: `npx sinbix build-base ${projectName}`
                  }
                ],
                parallel: false
              }
            };
          }
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
      addBuildBuilder(options),
      formatFiles(),
    ]);
  };
}
