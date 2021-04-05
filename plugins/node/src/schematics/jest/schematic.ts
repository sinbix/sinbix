import { chain, Rule, Tree } from '@angular-devkit/schematics';
import {
  initJest,
  JestSchematicOptions,
  updateTsConfig,
  normalizeOptions,
  jestBuilder,
  addFiles,
  updateJestConfig,
} from './utils';

export default function (options: JestSchematicOptions): Rule {
  return (host: Tree) => {
    const normalizedOptions = normalizeOptions(host, options);

    return chain([
      initJest(),
      jestBuilder(normalizedOptions),
      updateJestConfig(normalizedOptions),
      addFiles(normalizedOptions),
      updateTsConfig(normalizedOptions),
    ]);
  };
}
