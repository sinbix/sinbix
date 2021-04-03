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
import { names } from '@sinbix/utils';
import { NormalizedOptions } from './models';

export function addFiles(options: NormalizedOptions): Rule {
  return mergeWith(
    apply(url(`./files`), [
      applyTemplates({
        ...options,
        ...names(options.name),
        ejsName: '<%= name %>'
      }),
      options.unitTestRunner === 'none'
        ? filter((file) => !file.endsWith('.spec.ts'))
        : noop(),
      move(`${options.projectConfig.root}/schematics`),
    ])
  );
}
