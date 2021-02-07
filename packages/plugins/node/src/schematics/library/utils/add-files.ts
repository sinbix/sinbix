import { NormalizedOptions } from './models';
import {
  apply,
  applyTemplates,
  filter,
  MergeStrategy,
  mergeWith,
  move,
  noop,
  Rule,
  url,
} from '@angular-devkit/schematics';
import { names, offsetFromRoot } from '@sinbix/utils';

export function addFiles(options: NormalizedOptions): Rule {
  return mergeWith(
    apply(url(`./files`), [
      applyTemplates({
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.projectRoot),
      }),
      move(options.projectRoot),
      options.unitTestRunner === 'none'
        ? filter((file) => !file.endsWith('spec.ts'))
        : noop(),
      options.publishable
        ? noop()
        : filter((file) => !file.endsWith('package.json')),
    ]),
    MergeStrategy.Overwrite
  );
}
