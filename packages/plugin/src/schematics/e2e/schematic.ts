import { chain, Rule, Tree } from '@angular-devkit/schematics';
import {
  addFiles,
  addJest,
  buildBuilder,
  E2eSchematicOptions,
  normalizeOptions,
  updateSinbix,
  addProject,
  validatePlugin,
} from './utils';

export default function (options: E2eSchematicOptions): Rule {
  return async (host: Tree) => {
    const normalizedOptions = normalizeOptions(host, options);
    validatePlugin(host, normalizedOptions);
    return chain([
      addProject(normalizedOptions),
      addFiles(normalizedOptions),
      buildBuilder(normalizedOptions),
      updateSinbix(normalizedOptions),
      addJest(normalizedOptions),
    ]);
  };
}
