import { LibrarySchematicOptions } from './models';
import {
  apply,
  applyTemplates,
  filter,
  MergeStrategy,
  mergeWith,
  move,
  noop,
  Rule,
  Tree,
  url,
} from '@angular-devkit/schematics';
import {
  getProjectConfig,
  names,
  normalizeProjectName,
  offsetFromRoot,
} from '@sinbix/common';

export function addFiles(options: LibrarySchematicOptions): Rule {
  return (host: Tree) => {
    const projectConfig = getProjectConfig(
      host,
      normalizeProjectName(options.name)
    );
    return mergeWith(
      apply(url(`./files`), [
        applyTemplates({
          ...options,
          ...names(options.name),
          offsetFromRoot: offsetFromRoot(projectConfig.root),
        }),
        move(projectConfig.root),
        options.unitTestRunner === 'none'
          ? filter((file) => !file.endsWith('spec.ts'))
          : noop(),
        options.publishable
          ? noop()
          : filter((file) => !file.endsWith('package.json')),
      ]),
      MergeStrategy.Overwrite
    );
  };
}
