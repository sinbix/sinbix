import { NormalizedOptions, PatternSchematicOptions } from './models';
import { normalizeProject } from '@sinbix/common';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';

export function normalizeOptions(
  host: Tree,
  options: PatternSchematicOptions
): NormalizedOptions {
  const normalizedProject = normalizeProject(options);

  return {
    ...options,
    ...normalizedProject,
  };
}
