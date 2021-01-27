import {
  chain,
  Rule,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { formatFiles } from '@sinbix/common';
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
} from './utils';

export default function (options: LibrarySchematicOptions): Rule {
  return (host: Tree) => {
    options = normalizeOptions(host, options);

    if (options.publishable && !options.importPath) {
      throw new SchematicsException(
        `For publishable libs you have to provide a proper "--importPath" which needs to be a valid npm package name (e.g. my-awesome-lib or @myorg/my-lib)`
      );
    }

    return chain([
      addNodeProject(options),
      addLint(options),
      addJest(options),
      addFiles(options),
      updateTsConfig(options),
      updateTsBaseConfig(options),
      buildBuilder(options),
      formatFiles(),
    ]);
  };
}
