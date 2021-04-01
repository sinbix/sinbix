import { Tree } from '@angular-devkit/schematics';
import { join, normalize } from 'path';

export function cleanDelete(path: string) {
  return (host: Tree) => {
    host.delete(definePath(host, path));
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
