import { RemoveSchematicOptions, NormalizedOptions } from './models';

export function normalizeOptions(
  options: RemoveSchematicOptions
): NormalizedOptions {
  return {
    ...options,
  };
}
