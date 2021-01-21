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
import { addPropertyToJestConfig } from "../../utils";

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

export default function (options: ProjectSchematicSchema): Rule {
  return chain([
    externalSchematic('@sinbix/common', 'project', options),
    addFiles({ project: options.name, options }),

    externalSchematic('@sinbix/typescript', 'lint', {
      project: normalizeProjectName(options.name),
    }),
    externalSchematic('@sinbix/typescript', 'jest', {
      project: normalizeProjectName(options.name),
    }),
    updateJestConfig(options),
  ]);
}
