import {
  apply,
  applyTemplates,
  mergeWith,
  move,
  url,
} from '@angular-devkit/schematics';
import { offsetFromRoot } from '@sinbix/core/plugin-utils';
import { NormalizedOptions } from './models';

export function addFiles(options: NormalizedOptions) {
  const projectConfig = options.projectConfig;
  return mergeWith(
    apply(url('./files'), [
      applyTemplates({
        ...options,
        offsetFromRoot: offsetFromRoot(projectConfig.root),
        projectRoot: projectConfig.root,
        dot: '.',
      }),
      move(projectConfig.root),
    ])
  );
}
