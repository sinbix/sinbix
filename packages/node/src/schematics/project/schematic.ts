import {
  chain,
  externalSchematic,
  Rule,
  Tree,
} from '@angular-devkit/schematics';
import {
  addFiles,
  getProjectConfig,
  normalizeProjectName,
} from '@sinbix/common';
import { ProjectSchematicSchema } from './schema';
import { addPropertyToJestConfig } from '../../utils';

function updateJestConfig(options: ProjectSchematicSchema): Rule {
  return (host: Tree) => {
    const projectConfig = getProjectConfig(
      host,
      normalizeProjectName(options.name)
    );
    addPropertyToJestConfig(
      host,
      'jest.config.js',
      'projects',
      `<rootDir>/${projectConfig.root}`
    );
  };
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
    updateJestConfig(options),
  ]);
}

export default function (options: ProjectSchematicSchema): Rule {
  return chain([
    externalSchematic('@sinbix/common', 'project', options),
    addFiles({ project: options.name, options }),

    externalSchematic('@sinbix/node', 'lint', {
      project: normalizeProjectName(options.name),
    }),
    addJest(options)
  ]);
}
