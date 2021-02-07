import { Tree } from '@angular-devkit/schematics';
import { join, normalize } from 'path';
import { NormalizedOptions } from './models';
import { getDestination, getProjectConfig } from '@sinbix/utils';

export function moveProject(options: NormalizedOptions) {
  return (host: Tree) => {
    const project = getProjectConfig(host, options.projectName);
    const destination = getDestination(options.destination);
    const dir = host.getDir(project.root);
    dir.visit((file) => {
      const newPath = file.replace(project.root, destination);
      host.create(newPath, host.read(file));
    });

    host.delete(definePath(host, project.root));
  };
}

function definePath(host: Tree, path: string) {
  const cutPath = normalize(join(path, '..'));
  const dir = host.getDir(cutPath);

  if (dir.subfiles?.length || dir.subdirs?.length > 1) {
    return path;
  } else {
    return definePath(host, cutPath);
  }
}
