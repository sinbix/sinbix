import { existsSync } from 'fs';
import * as path from 'path';

/**
 * Recursive function that walks back up the directory
 * tree to try and find a workspace file.
 *
 * @param dir Directory to start searching with
 */
export function findWorkspaceRoot(dir: string): string {
  if (path.dirname(dir) === dir) {
    return null;
  }

  if (existsSync(path.join(dir, 'workspace.json'))) {
    return dir
  }

  return findWorkspaceRoot(path.dirname(dir));
}
