import { Rule, Tree } from '@angular-devkit/schematics';
import { join } from 'path';

export function addGitkeepInTree(path: string): Rule {
  return (host: Tree) => {
    const gitkeepPath = join(path, '.gitkeep');
    if (!host.get(gitkeepPath)) {
      host.create(gitkeepPath, '')
    }
  };
}
