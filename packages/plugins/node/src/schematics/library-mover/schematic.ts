import { chain, Rule } from '@angular-devkit/schematics';
import { normalizeOptions, LibraryMoverSchematicOptions } from './utils';

export default function (options: LibraryMoverSchematicOptions): Rule {
  const normalizedOptions = normalizeOptions(options);
  return chain([]);
}
