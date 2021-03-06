import { chain, Rule } from '@angular-devkit/schematics';
import { NormalizedOptions } from './models';
import { updateWorkspaceInTree } from '@sinbix/core/plugin-utils';

export function e2eBuilder(options: NormalizedOptions): Rule {
  return chain([
    updateWorkspaceInTree((workspace) => {
      const project = workspace.projects[options.projectName];
      project.architect.e2e = {
        builder: '@sinbix/plugin:e2e',
        options: {},
      };
      return workspace;
    }),
  ]);
}
