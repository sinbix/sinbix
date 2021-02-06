import { NormalizedOptions } from './models';
import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  url,
} from '@angular-devkit/schematics';
import { offsetFromRoot } from '@sinbix/common';

export function addFiles(options: NormalizedOptions) {
  return chain([
    mergeWith(
      apply(url('./files'), [
        applyTemplates({
          ...options,
          offsetFromRoot: offsetFromRoot(options.projectRoot),
        }),
        move(options.projectRoot),
      ])
    ),
  ]);
}
