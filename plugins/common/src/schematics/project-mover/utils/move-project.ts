import { chain, Tree } from '@angular-devkit/schematics';
import { NormalizedOptions } from './models';
import { getDestination, getProjectConfig } from '@sinbix/core/plugin-utils';
import { cleanDelete } from '../../../utils';

export function moveProject(options: NormalizedOptions) {
  return (host: Tree) => {
    const project = getProjectConfig(host, options.projectName);
    return chain([copyProject(options), cleanDelete(project.root)]);
  };
}

function copyProject(options: NormalizedOptions) {
  return (host: Tree) => {
    const project = getProjectConfig(host, options.projectName);
    const destination = getDestination(options.destination);
    const dir = host.getDir(project.root);
    dir.visit((file) => {
      const newPath = file.replace(project.root, destination);
      host.create(newPath, host.read(file));
    });
  };
}
