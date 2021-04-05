import { NormalizedOptions, ProjectSchematicOptions } from './models';
import { normalizeProject } from '@sinbix/utils';
import { Tree } from '@angular-devkit/schematics';

export function normalizeOptions(
  host: Tree,
  options: ProjectSchematicOptions
): NormalizedOptions {
  return {
    ...options,
    ...normalizeProject(options),
  };
}
