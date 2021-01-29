import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';
import { updateWorkspaceInTree } from '@sinbix/common';
import { NormalizedOptions } from './models';

export function addJest(options: NormalizedOptions): Rule {
  return chain([
    externalSchematic('@sinbix/node', 'jest', {
      project: options.projectName,
      setupFile: 'none',
      supportTsx: false,
      skipSerializers: true,
    }),
    updateWorkspaceProject(options),
  ]);
}

function updateWorkspaceProject(options: NormalizedOptions) {
  return updateWorkspaceInTree((workspace) => {
    const project = workspace.projects[options.projectName];
    const testOptions = project.architect.test.options;
    const e2eOptions = project.architect.e2e.options;
    project.architect.e2e.options = {
      ...e2eOptions,
      jestConfig: testOptions.jestConfig,
    };

    delete project.architect.test;

    return workspace;
  });
}
