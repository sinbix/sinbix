import { chain, Tree } from '@angular-devkit/schematics';
import { normalizeOptions, ProjectSchematicOptions } from './utils';
import { addProjectToNxJsonInTree, updateWorkspaceInTree } from '../../utils';

export default (options: ProjectSchematicOptions) => {
  return (host: Tree) => {
    const {
      projectName,
      projectRoot,
      projectTags,
      sourceRoot,
      type,
    } = normalizeOptions(host, options);
    return chain([
      updateWorkspaceInTree((workspace) => {
        workspace.projects[projectName] = {
          root: projectRoot,
          sourceRoot: sourceRoot ? `${projectRoot}/${sourceRoot}` : undefined,
          projectType: type,
          architect: {},
        };

        return workspace;
      }),
      addProjectToNxJsonInTree(projectName, {
        tags: projectTags,
      }),
    ]);
  };
};
