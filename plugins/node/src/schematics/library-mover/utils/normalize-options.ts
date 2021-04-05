import { LibraryMoverSchematicOptions } from './models';

export function normalizeOptions(options: LibraryMoverSchematicOptions) {
  return {
    ...options,
  };
}
