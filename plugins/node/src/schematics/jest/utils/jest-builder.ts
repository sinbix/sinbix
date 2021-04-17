import { NormalizedOptions } from './models';
import { updateWorkspaceInTree } from '@sinbix/core/plugin-utils';

export function jestBuilder(options: NormalizedOptions) {
  const projectConfig = options.projectConfig;
  return updateWorkspaceInTree((workspace) => {
    const architect = workspace.projects[options.project].architect;

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
}
