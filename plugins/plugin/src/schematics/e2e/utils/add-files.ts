import {
  apply,
  applyTemplates,
  mergeWith,
  move,
  Rule,
  url,
} from '@angular-devkit/schematics';
import { names, offsetFromRoot } from '@sinbix/core/plugin-utils';
import { NormalizedOptions } from './models';

export function addFiles(options: NormalizedOptions): Rule {
  return mergeWith(
    apply(url('./files'), [
      applyTemplates({
        ...options,
        ...names(options.pluginName),
        offsetFromRoot: offsetFromRoot(options.projectRoot),
      }),
      move(options.projectRoot),
    ])
  );
}
