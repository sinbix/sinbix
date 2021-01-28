import { NormalizedOptions, PluginSchematicOptions } from './models';
import { Tree } from '@angular-devkit/schematics';
import { normalizeProject } from './mock';

export function normalizeOptions(
  host: Tree,
  options: PluginSchematicOptions
): NormalizedOptions {
  return {
    ...options,
    ...normalizeProject(options),
  };
}
