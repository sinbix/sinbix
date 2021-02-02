import { NormalizedOptions, PatternSchematicOptions } from './models';
import { normalizeProject } from '@sinbix/common';

export function normalizeOptions(
  options: PatternSchematicOptions
): NormalizedOptions {
  const normalizedProject = normalizeProject(options);

  return {
    ...options,
    ...normalizedProject,
  };
}
