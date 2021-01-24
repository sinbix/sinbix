import { chain, Tree } from '@angular-devkit/schematics';
import { ProjectSchematicSchema } from './schema';

import {
  addProjectToNxJsonInTree,
  normalizeProjectName,
  toFileName,
  updateWorkspaceInTree
} from "../../utils";

interface NormalizedSchema extends ProjectSchematicSchema {
  projectName: string;
  projectRoot: string;
  projectTags: string[];
}

function normalizeOptions(
  host: Tree,
  options: ProjectSchematicSchema
): NormalizedSchema {
  const name = options.name;

  const projectName = normalizeProjectName(name);

  const projectRoot = options.directory
    ? `${toFileName(options.directory)}/${name}`
    : name;

  const projectTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectTags,
  };
}

export default (options: ProjectSchematicSchema) => {
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
          architect: {}
        };

        return workspace;
      }),
      addProjectToNxJsonInTree(projectName, {
        tags: projectTags,
      }),
    ]);
  };
};
