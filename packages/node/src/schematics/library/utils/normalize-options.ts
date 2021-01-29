import { Tree } from '@angular-devkit/schematics';
import { getNpmScope, normalizeProject } from '@sinbix/common';
import { LibrarySchematicOptions, NormalizedOptions } from './models';

export function normalizeOptions(
  host: Tree,
  options: LibrarySchematicOptions
): NormalizedOptions {
  const normalizedProject = normalizeProject(options);
  const defaultPrefix = getNpmScope(host);

  const importPath =
    options.importPath || `@${defaultPrefix}/${normalizedProject.projectName}`;

  return {
    ...options,
    ...normalizedProject,
    importPath,
  };
}
