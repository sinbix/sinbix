import { Tree } from '@angular-devkit/schematics';
import { updateWorkspaceInTree } from '@sinbix/utils';
import { NormalizedOptions } from './models';

export function checkTargets(options: NormalizedOptions) {
  if (options.forceRemove) {
    return (tree: Tree) => tree;
  }

  return updateWorkspaceInTree((workspace) => {
    const findTarget = new RegExp(`${options.projectName}:`);

    const usedIn = [];

    for (const name of Object.keys(workspace.projects)) {
      if (name === options.projectName) {
        continue;
      }

      const projectStr = JSON.stringify(workspace.projects[name]);

      if (findTarget.test(projectStr)) {
        usedIn.push(name);
      }
    }

    if (usedIn.length > 0) {
      let message = `${options.projectName} is still targeted by the following projects:\n\n`;
      for (let project of usedIn) {
        message += `${project}\n`;
      }
      throw new Error(message);
    }

    return workspace;
  });
}
