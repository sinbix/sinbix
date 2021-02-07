import { Tree } from '@angular-devkit/schematics';
import { normalizeProject } from '@sinbix/utils';
import { NormalizedOptions, ProjectSchematicOptions } from './models';

export function normalizeOptions(
  host: Tree,
  options: ProjectSchematicOptions
): NormalizedOptions {
  return {
    ...options,
    ...normalizeProject(options),
    projectDependencies: options.dependencies
      ? options.dependencies.split(',').map((s) => s.trim())
      : [],
  };
}
