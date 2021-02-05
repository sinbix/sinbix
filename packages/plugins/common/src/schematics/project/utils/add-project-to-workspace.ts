import { NormalizedOptions } from './models';
import { updateWorkspaceInTree } from '../../../utils';

export function addProjectToWorkspace(options: NormalizedOptions) {
  return updateWorkspaceInTree((workspace) => {
    workspace.projects[options.projectName] = {
      root: options.projectRoot,
      sourceRoot: options.sourceRoot
        ? `${options.projectRoot}/${options.sourceRoot}`
        : undefined,
      projectType: options.type,
      architect: {},
    };

    return workspace;
  });
}
