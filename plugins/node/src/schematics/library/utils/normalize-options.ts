import { Tree } from '@angular-devkit/schematics';
import { getNpmScope, normalizeProject } from '@sinbix/core/plugin-utils';
import { LibrarySchematicOptions, NormalizedOptions } from './models';

export function normalizeOptions(
  host: Tree,
  options: LibrarySchematicOptions
): NormalizedOptions {
  const normalizedProject = normalizeProject(options);
  const defaultPrefix = getNpmScope(host);

  const importPath =
    options.importPath || `@${defaultPrefix}/${normalizedProject.projectRoot}`;

  return {
    ...options,
    ...normalizedProject,
    importPath,
  };
}
