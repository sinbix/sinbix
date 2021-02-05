import { JestSchematicOptions, NormalizedOptions } from './models';
import { normalizeProjectConfig } from '@sinbix/common';
import { Tree } from '@angular-devkit/schematics';

export function normalizeOptions(
  host: Tree,
  options: JestSchematicOptions
): NormalizedOptions {
  if (options.testEnvironment === 'jsdom') {
    options.testEnvironment = '';
  }

  // if we support TSX we don't support angular(html templates)
  if (options.supportTsx) {
    options.skipSerializers = true;
  }

  const projectConfig = normalizeProjectConfig(host, options.project);

  return {
    ...options,
    ...projectConfig,
  };
}
