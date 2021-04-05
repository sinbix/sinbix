import {
  apply,
  applyTemplates,
  mergeWith,
  move,
  url,
} from '@angular-devkit/schematics';
import { offsetFromRoot } from '@sinbix/utils';
import { NormalizedOptions } from './models';

export function addFiles(options: NormalizedOptions) {
  return mergeWith(
    apply(url('./files'), [
      applyTemplates({
        ...options,
        offsetFromRoot: offsetFromRoot(options.projectRoot),
        dot: '.',
      }),
      move(options.projectRoot),
    ])
  );
}
