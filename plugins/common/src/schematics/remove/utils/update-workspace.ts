import { NormalizedOptions } from './models';
import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspacePath, updateWorkspaceInTree } from '@sinbix/core/plugin-utils';

export function updateWorkspace(options: NormalizedOptions) {
  return updateWorkspaceInTree(
    (workspace, context: SchematicContext, host: Tree) => {
      delete workspace.projects[options.projectName];
      if (
        workspace.defaultProject &&
        workspace.defaultProject === options.projectName
      ) {
        delete workspace.defaultProject;
        const workspacePath = getWorkspacePath(host);
        context.logger.warn(
          `Default project was removed in ${workspacePath} because it was "${options.projectName}". If you want a default project you should define a new one.`
        );
      }
      return workspace;
    }
  );
}
