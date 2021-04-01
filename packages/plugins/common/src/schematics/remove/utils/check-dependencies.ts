import { Rule, Tree } from '@angular-devkit/schematics';
import { ProjectGraph } from '@sinbix/core';
import { FileData } from '@sinbix/core/src/file-utils';
import {
  createProjectGraph,
  onlyWorkspaceProjects,
  reverse,
} from '@sinbix/core/src/project-graph';
import {
  getWorkspacePath,
  readSinbixJsonInTree,
  readWorkspace,
} from '@sinbix/utils';
import ignore from 'ignore';
import * as path from 'path';
import { RemoveSchematicOptions } from './models';

/**
 * Check whether the project to be removed is depended on by another project
 *
 * Throws an error if the project is in use, unless the `--forceRemove` option is used.
 *
 * @param schema The options provided to the schematic
 */
export function checkDependencies(schema: RemoveSchematicOptions): Rule {
  if (schema.forceRemove) {
    return (tree: Tree) => tree;
  }
  let ig = ignore();

  return (tree: Tree): Tree => {
    if (tree.exists('.gitignore')) {
      ig = ig.add(tree.read('.gitignore').toString());
    }
    const files: FileData[] = [];
    const workspaceDir = path.dirname(getWorkspacePath(tree));

    for (const dir of tree.getDir('/').subdirs) {
      if (ig.ignores(dir)) {
        continue;
      }

      tree.getDir(dir).visit((file: string) => {
        files.push({
          file: path.relative(workspaceDir, file),
          ext: path.extname(file),
          hash: '',
        });
      });
    }

    const graph: ProjectGraph = createProjectGraph(
      readWorkspace(tree),
      readSinbixJsonInTree(tree),
      files,
      (file) => {
        try {
          return tree.read(file).toString('utf-8');
        } catch (e) {
          throw new Error(`Could not read ${file}`);
        }
      },
      false,
      false
    );

    const reverseGraph = onlyWorkspaceProjects(reverse(graph));

    const deps = reverseGraph.dependencies[schema.projectName] || [];

    if (deps.length === 0) {
      return tree;
    }

    throw new Error(
      `${
        schema.projectName
      } is still depended on by the following projects:\n${deps
        .map((x) => x.target)
        .join('\n')}`
    );
  };
}
