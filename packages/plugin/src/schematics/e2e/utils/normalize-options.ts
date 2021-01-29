import { Tree } from '@angular-devkit/schematics';
import { toPropertyName } from '@nrwl/workspace';
import { NormalizedOptions, E2eSchematicOptions } from './models';
import { getNpmScope } from '@sinbix/common';
import { normalizeProject } from '@sinbix/common';

export function normalizeOptions(
  host: Tree,
  options: E2eSchematicOptions
): NormalizedOptions {
  const npmScope = getNpmScope(host);
  return {
    ...options,
    ...normalizeProject({
      ...options,
      name: `${options.e2eDirectory}/${options.pluginName}`,
    }),
    npmScope,
  };
}
