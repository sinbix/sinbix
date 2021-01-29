import {
  apply,
  applyTemplates,
  mergeWith,
  move,
  Rule,
  url,
} from '@angular-devkit/schematics';
import { offsetFromRoot } from '@sinbix/common';
import { NormalizedOptions } from './models';

export function addFiles(options: NormalizedOptions): Rule {
  return mergeWith(
    apply(url('./files'), [
      applyTemplates({
        ...options,
        offsetFromRoot: offsetFromRoot(options.projectRoot),
      }),
      move(options.projectRoot),
    ])
  );
}
