import { chain, Rule } from '@angular-devkit/schematics';
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
  options = normalizeOptions(options);

  return chain([
    initJest(),
    jestBuilder(options),
    updateJestConfig(options),
    addFiles(options),
    updateTsConfig(options),
  ]);
}
