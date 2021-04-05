import { MoveSchematicOptions, NormalizedOptions } from './models';

export function normalizeOptions(
  options: MoveSchematicOptions
): NormalizedOptions {
  return {
    ...options,
  };
}
