import { Tree } from '@angular-devkit/schematics';
import { getNpmScope, toFileName } from '@sinbix/common';
import { LibrarySchematicOptions } from './models';

export function normalizeOptions(
  host: Tree,
  options: LibrarySchematicOptions
): LibrarySchematicOptions {
  const defaultPrefix = getNpmScope(host);
  const name = toFileName(options.name);
  const projectDirectory = options.directory
    ? `${toFileName(options.directory)}/${name}`
    : name;

  const importPath =
    options.importPath || `@${defaultPrefix}/${projectDirectory}`;

  return {
    ...options,
    importPath,
  };
}
