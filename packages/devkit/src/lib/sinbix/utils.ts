import { Sinbix, SinbixProject, SinbixProjectType } from './types';
import { Dictionary } from '@sinbix/common';
import { Rule, Tree } from '@angular-devkit/schematics';
import { readJsonInTree } from '@nrwl/workspace';
import { workspaces } from '@angular-devkit/core';

export class SinbixDefinition {
  projectTypes: Dictionary<SinbixProjectType>;
  projects: Dictionary<SinbixProjectsDefinition>;
}

export class SinbixProjectsDefinition {
  add(project: SinbixProject): SinbixProjectDefinition {
    return new SinbixProjectDefinition();
  }
}

export class SinbixProjectDefinition {}

function createHost(tree: Tree): workspaces.WorkspaceHost {
  return {
    async readFile(path: string): Promise<string> {
      const data = tree.read(path);
      if (!data) {
        throw new Error('File not found.');
      }

      return data.toString();
    },
    async writeFile(path: string, data: string): Promise<void> {
      return tree.overwrite(path, data);
    },
    async isDirectory(path: string): Promise<boolean> {
      // approximate a directory check
      return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
    },
    async isFile(path: string): Promise<boolean> {
      return tree.exists(path);
    },
  };
}

export function getSinbix(host: Tree) {
  return readJsonInTree(host, 'sinbix.json');
}

// export function sinbixUpdate(
//   updater: (sinbix: SinbixDefinition) => void | PromiseLike<void>
// ): Rule;
