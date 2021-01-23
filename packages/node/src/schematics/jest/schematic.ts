import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';

import {
  addDepsToPackageJson,
  getProjectConfig,
  offsetFromRoot,
  updateWorkspace,
} from '@sinbix/common';

import { JestSchematicSchema } from './schema';
import {
  addPropertyToJestConfig,
  jestTypesVersion,
  jestVersion,
  tsJestVersion,
} from '../../utils';
import { updateTsConfig } from './utils';

function normalizeOptions(options: JestSchematicSchema): JestSchematicSchema {
  if (options.testEnvironment === 'jsdom') {
    options.testEnvironment = '';
  }

  // if we support TSX or babelJest we don't support angular(html templates)
  if (options.supportTsx) {
    options.skipSerializers = true;
  }

  return options;
}

function initJest() {
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
            template({
              dot: '.',
              tmpl: '',
            }),
          ])
        ),
      ]);
    }
  };
}

function addJestBuilder(options: JestSchematicSchema) {
  return (host: Tree) => {
    const project = options.project;
    const projectConfig = getProjectConfig(host, project);
    return updateWorkspace((workspace) => {
      workspace.projects.get(project).targets.set('test', {
        builder: '@sinbix/node:jest',
        options: {
          jestConfig: `${projectConfig.root}/jest.config.js`,
          passWithNoTests: true,
        },
      });
    });
  };
}

function updateJestConfig(options: JestSchematicSchema): Rule {
  return (host: Tree) => {
    const projectConfig = getProjectConfig(host, options.project);
    addPropertyToJestConfig(
      host,
      'jest.config.js',
      'projects',
      `<rootDir>/${projectConfig.root}`
    );
  };
}

function addFiles(options: JestSchematicSchema) {
  return (host: Tree) => {
    const projectConfig = getProjectConfig(host, options.project);
    return mergeWith(
      apply(url('./files'), [
        template({
          ...options,
          offsetFromRoot: offsetFromRoot(projectConfig.root),
          projectRoot: projectConfig.root,
          dot: '.',
          tmpl: '',
        }),
        move(projectConfig.root),
      ])
    );
  };
}

export default function (options: JestSchematicSchema): Rule {
  options = normalizeOptions(options);

  return chain([
    initJest(),
    addJestBuilder(options),
    updateJestConfig(options),
    addFiles(options),
    updateTsConfig(options),
  ]);
}
