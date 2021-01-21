import {
  apply,
  chain,
  mergeWith,
  Rule,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';

import {
  addDepsToPackageJson,
  addFiles,
  getProjectConfig,
  updateWorkspace,
} from '@sinbix/common';

import { JestSchematicSchema } from './schema';
import { jestTypesVersion, jestVersion, tsJestVersion } from '../../utils';
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

function addFilesJest(options: JestSchematicSchema) {
  return (host: Tree) => {
    const projectConfig = getProjectConfig(host, options.project);
    return addFiles({
      project: options.project,
      options: {
        ...options,
        projectRoot: projectConfig.root,
      },
    });
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

export default function (options: JestSchematicSchema): Rule {
  options = normalizeOptions(options);

  return chain([
    initJest(),
    addFilesJest(options),
    updateTsConfig(options),
    addJestBuilder(options),
  ]);
}
