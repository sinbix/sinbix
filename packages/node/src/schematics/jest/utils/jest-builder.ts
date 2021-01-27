import { JestSchematicOptions } from './models';
import { Tree } from '@angular-devkit/schematics';
import { getProjectConfig, updateWorkspaceInTree } from '@sinbix/common';

export function jestBuilder(options: JestSchematicOptions) {
  return (host: Tree) => {
    const project = options.project;
    const projectConfig = getProjectConfig(host, project);
    return updateWorkspaceInTree((workspace) => {
      const architect = workspace.projects[project].architect;

      if (architect) {
        architect['test'] = {
          builder: '@sinbix/node:jest',
          options: {
            jestConfig: `${projectConfig.root}/jest.config.js`,
            passWithNoTests: true,
          },
        };
      }
      return workspace;
    });
  };
}
