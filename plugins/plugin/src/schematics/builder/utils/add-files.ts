import {
  apply,
  applyTemplates,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  url,
} from '@angular-devkit/schematics';
import { names } from '@sinbix/core/plugin-utils';
import { NormalizedOptions } from './models';

export function addFiles(options: NormalizedOptions): Rule {
  return mergeWith(
    apply(url(`./files`), [
      applyTemplates({
        ...options,
        ...names(options.name),
      }),
      options.unitTestRunner === 'none'
        ? filter((file) => !file.endsWith('.spec.ts'))
        : noop(),
      move(`${options.projectConfig.root}/builders`),
    ])
  );
}
