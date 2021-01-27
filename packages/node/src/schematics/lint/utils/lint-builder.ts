import { Tree } from '@angular-devkit/schematics';
import { getProjectConfig, updateWorkspaceInTree } from '@sinbix/common';
import { LintSchematicOptions } from './models';

export function lintBuilder(options: LintSchematicOptions) {
  return (host: Tree) => {
    const project = options.project;
    return updateWorkspaceInTree((workspace) => {
      const architect = workspace.projects[project].architect;

      if (architect) {
        architect['lint'] = {
          builder: '@sinbix/node:lint',
          options: {
            lintFilePatterns: [
              `${getProjectConfig(host, project).root}/**/*.ts`,
            ],
          },
        };
      }

      return workspace;
    });
  };
}
