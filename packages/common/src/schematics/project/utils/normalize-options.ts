import { Tree } from '@angular-devkit/schematics';
import { normalizeProjectName, toFileName } from '@sinbix/common';
import { NormalizedOptions, ProjectSchematicOptions } from './models';

export function normalizeOptions(
  host: Tree,
  options: ProjectSchematicOptions
): NormalizedOptions {
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
