import { updateWorkspaceInTree } from '@sinbix/core/plugin-utils';
import { NormalizedOptions } from './models';

export function lintBuilder(options: NormalizedOptions) {
  const project = options.project;
  return updateWorkspaceInTree((workspace) => {
    const architect = workspace.projects[project].architect;

    if (architect) {
      architect['lint'] = {
        builder: '@sinbix/node:lint',
        options: {
          lintFilePatterns: [`${options.projectConfig.root}/**/*.ts`],
        },
      };
    }

    return workspace;
  });
}
