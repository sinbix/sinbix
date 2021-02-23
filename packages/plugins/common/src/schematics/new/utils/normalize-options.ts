import { NewSchematicOptions, NormalizedOptions } from "./models";
import { toFileName } from '@sinbix/utils';

export function normalizeOptions(
  options: NewSchematicOptions
): NormalizedOptions {
  if (!options.directory) {
    options.directory = options.name;
  }

  return {
    ...options,
    name: toFileName(options.name),
    directory: options.directory || options.name
  };
}
