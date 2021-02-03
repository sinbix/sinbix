import { chain, Rule, Tree } from '@angular-devkit/schematics';
import {
  addFiles,
  addJest,
  e2eBuilder,
  E2eSchematicOptions,
  normalizeOptions,
  updateSinbix,
  nodeProject,
  validatePlugin,
  updateTsConfig,
} from './utils';
import { formatFiles } from "@sinbix/common";

export default function (options: E2eSchematicOptions): Rule {
  return async (host: Tree) => {
    const normalizedOptions = normalizeOptions(host, options);
    validatePlugin(host, normalizedOptions);
    return chain([
      nodeProject(normalizedOptions),
      addFiles(normalizedOptions),
      e2eBuilder(normalizedOptions),
      updateSinbix(normalizedOptions),
      addJest(normalizedOptions),
      updateTsConfig(normalizedOptions),
      formatFiles()
    ]);
  };
}
