import { NormalizedOptions } from './models';
import { noop } from '@angular-devkit/schematics';
import { addGitKeep } from '@sinbix/utils';

export function gitkeep(options: NormalizedOptions) {
  return !options.skipGitkeep ? addGitKeep(options.projectRoot) : noop();
}
