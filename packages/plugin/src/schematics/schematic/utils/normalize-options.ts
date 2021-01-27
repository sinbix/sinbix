import { Tree } from '@angular-devkit/schematics';
import {
  getProjectConfig,
  readNxJsonInTree,
  toFileName,
} from '@nrwl/workspace';
import { NormalizedOptions, SchematicSchematicOptions } from './models';
import { getFileTemplate } from '../../../utils';

export function normalizeOptions(
  host: Tree,
  options: SchematicSchematicOptions
): NormalizedOptions {
  const nxJson = readNxJsonInTree(host);
  const npmScope = nxJson.npmScope;
  const fileName = toFileName(options.name);

  const { root: projectRoot, sourceRoot: projectSourceRoot } = getProjectConfig(
    host,
    options.project
  );

  const npmPackageName = `@${npmScope}/${fileName}`;

  const fileTemplate = getFileTemplate();

  let description: string;
  if (options.description) {
    description = options.description;
  } else {
    description = `${options.name} schematic`;
  }

  return {
    ...options,
    fileName,
    description,
    projectRoot,
    projectSourceRoot,
    npmScope,
    npmPackageName,
    fileTemplate,
  };
}
