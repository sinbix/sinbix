import { chain, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ProjectSchematicSchema } from './schema';
import {
  addSinbixToSinbixJsonInTree, normalizeProjectName,
  projectWorkspaceType,
  typeRootDir
} from "../..";
import { toFileName } from "../../workspace/utils/name-utils";
import { updateWorkspace } from "../../workspace/utils/workspace";

interface NormalizedSchema extends ProjectSchematicSchema {
  projectName: string;
  projectRoot: string;
  projectType: string;
  projectTags: string[];
}

function normalizeOptions(
  host: Tree,
  options: ProjectSchematicSchema
): NormalizedSchema {
  const name = options.name;

  const projectName = normalizeProjectName(name);

  const projectDirectory = toFileName(name);

  const type = options.type;

  const projectType = projectWorkspaceType(host, type);

  const projectRoot = `${typeRootDir(host, type)}/${projectDirectory}`;

  const projectTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectType,
    projectTags,
  };
}

export default (options: ProjectSchematicSchema) => {
  return (host: Tree) => {
    const {
      projectName,
      projectRoot,
      projectType,
      projectTags,
      sourceRoot,
      type,
      targets,
    } = normalizeOptions(host, options);
    return chain([
      updateWorkspace((workspace) => {
        workspace.projects.add({
          name: projectName,
          root: projectRoot,
          sourceRoot: sourceRoot ? `${projectRoot}/${sourceRoot}` : undefined,
          projectType: projectType,
        });
        targets?.forEach((target) => {
          workspace.projects.get(projectName).targets.add(target);
        });
      }),
      addSinbixToSinbixJsonInTree(projectName, {
        type: type,
        tags: projectTags,
      }),
    ]);
  };
};
