import { NormalizedOptions } from './models';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { externalSchematic } from '@angular-devkit/schematics';
import { readJsonInTree } from '@sinbix/utils';

export function runMover(options: NormalizedOptions) {
  return (host: Tree) => {
    const projectMover = readJsonInTree(host, 'sinbix.json').projects[
      options.projectName
    ].mover as string;

    const mover = projectMover ?? '@sinbix/common:project-mover';

    const parts = mover.split(':');
    return externalSchematic(parts[0], parts[1], options);
  };
}
