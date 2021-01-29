import { externalSchematic, noop } from '@angular-devkit/schematics';
import { NormalizedOptions } from './models';

export function addLint(options: NormalizedOptions) {
  return options.linter === 'eslint'
    ? externalSchematic('@sinbix/node', 'lint', {
        project: options.projectName,
      })
    : noop;
}
