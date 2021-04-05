import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { formatFiles } from '@sinbix/utils';
import {
  updateTsConfig,
  LibrarySchematicOptions,
  normalizeOptions,
  addNodeProject,
  addLint,
  addJest,
  addFiles,
  updateTsBaseConfig,
  buildBuilder,
  validateOptions,
} from './utils';

export default function (options: LibrarySchematicOptions): Rule {
  return (host: Tree) => {
    const normalizedOptions = normalizeOptions(host, options);
    validateOptions(host, normalizedOptions);
    return chain([
      addNodeProject(normalizedOptions),
      addLint(normalizedOptions),
      addJest(normalizedOptions),
      addFiles(normalizedOptions),
      updateTsConfig(normalizedOptions),
      updateTsBaseConfig(normalizedOptions),
      buildBuilder(normalizedOptions),
      formatFiles(),
    ]);
  };
}
