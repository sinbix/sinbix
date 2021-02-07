import { NewSchematicOptions } from './models';
import { toFileName } from '@sinbix/utils';

export function normalizeOptions(
  options: NewSchematicOptions
): NewSchematicOptions {
  options.name = toFileName(options.name);
  if (!options.directory) {
    options.directory = options.name;
  }

  return options;
}
