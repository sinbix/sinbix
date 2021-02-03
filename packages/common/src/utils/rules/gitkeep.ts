import { Tree } from '@angular-devkit/schematics';
import { join } from 'path';

export function addGitKeep(path: string) {
  return (host: Tree) => {
    host.create(join(path, '.gitkeep'), '');
  };
}
