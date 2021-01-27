import { JestSchematicOptions } from './models';

export function normalizeOptions(
  options: JestSchematicOptions
): JestSchematicOptions {
  if (options.testEnvironment === 'jsdom') {
    options.testEnvironment = '';
  }

  // if we support TSX we don't support angular(html templates)
  if (options.supportTsx) {
    options.skipSerializers = true;
  }

  return options;
}
