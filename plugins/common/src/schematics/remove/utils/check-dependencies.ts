import { Rule, Tree } from '@angular-devkit/schematics';
import { ProjectGraph } from '@sinbix/core';
import { FileData } from '@sinbix/core/file-utils';
import {
  createProjectGraph,
  onlyWorkspaceProjects,
  reverse,
} from '@sinbix/core/project-graph';
import {
  getWorkspacePath,
  readSinbixJsonInTree,
  readWorkspace,
} from '@sinbix/core/plugin-utils';
import ignore from 'ignore';
import * as path from 'path';
import { RemoveSchematicOptions } from './models';

export function checkDependencies(options: RemoveSchematicOptions): Rule {
  if (options.forceRemove) {
    return (tree: Tree) => tree;
  }
  let ig = ignore();

  return (host: Tree): Tree => {
    if (host.exists('.gitignore')) {
      ig = ig.add(host.read('.gitignore').toString());
    }
    const files: FileData[] = [];
    const workspaceDir = path.dirname(getWorkspacePath(host));

    for (const dir of host.getDir('/').subdirs) {
      if (ig.ignores(dir)) {
        continue;
      }

      host.getDir(dir).visit((file: string) => {
        files.push({
          file: path.relative(workspaceDir, file),
          ext: path.extname(file),
          hash: '',
        });
      });
    }

    const graph: ProjectGraph = createProjectGraph(
      readWorkspace(host),
      readSinbixJsonInTree(host),
      files,
      (file) => {
        try {
          return host.read(file).toString('utf-8');
        } catch (e) {
          throw new Error(`Could not read ${file}`);
        }
      },
      false,
      false
    );

    const reverseGraph = onlyWorkspaceProjects(reverse(graph));

    const deps = reverseGraph.dependencies[options.projectName] || [];

    if (deps.length === 0) {
      return host;
    }

    throw new Error(
      `${
        options.projectName
      } is still depended on by the following projects:\n${deps
        .map((x) => x.target)
        .join('\n')}`
    );
  };
}
