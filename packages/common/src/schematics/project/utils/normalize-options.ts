import { Tree } from '@angular-devkit/schematics';
import { normalizeProject } from '../../../utils';
import { NormalizedOptions, ProjectSchematicOptions } from './models';

export function normalizeOptions(
  host: Tree,
  options: ProjectSchematicOptions
): NormalizedOptions {
  return {
    ...options,
    ...normalizeProject(options),
  };
}
