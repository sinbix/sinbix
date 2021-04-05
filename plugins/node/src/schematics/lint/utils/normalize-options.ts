import { LintSchematicOptions, NormalizedOptions } from './models';
import { Tree } from '@angular-devkit/schematics';
import { normalizeProjectConfig } from '@sinbix/utils';

export function normalizeOptions(
  host: Tree,
  options: LintSchematicOptions
): NormalizedOptions {
  const projectConfig = normalizeProjectConfig(host, options.project);

  return {
    ...options,
    ...projectConfig,
  };
}
