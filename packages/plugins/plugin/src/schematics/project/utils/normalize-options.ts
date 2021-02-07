import { NormalizedOptions, ProjectSchematicOptions } from './models';
import { Tree } from '@angular-devkit/schematics';
import { normalizeProject } from '@sinbix/utils';

export function normalizeOptions(
  host: Tree,
  options: ProjectSchematicOptions
): NormalizedOptions {
  return {
    ...options,
    ...normalizeProject(options),
  };
}
