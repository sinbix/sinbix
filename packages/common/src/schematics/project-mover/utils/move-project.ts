import { Tree } from '@angular-devkit/schematics';
import { NormalizedOptions } from './models';
import { getDestination, getProjectConfig } from '../../../utils';

export function moveProject(options: NormalizedOptions) {
  return (host: Tree) => {
    const project = getProjectConfig(host, options.projectName);

    const destination = getDestination(options.destination);
    const dir = host.getDir(project.root);
    dir.visit((file) => {
      const newPath = file.replace(project.root, destination);
      host.create(newPath, host.read(file));
    });

    host.delete(project.root);
  };
}
