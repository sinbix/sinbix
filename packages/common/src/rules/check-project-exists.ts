import { Rule, Tree } from '@angular-devkit/schematics';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getWorkspace } from '../utils/workspace';

/**
 * Checks whether the project exists in the workspace.
 * Throws an Error if the project is not found.
 *
 * @param schema The options provided to the schematic
 */
export function checkProjectExists(schema: { projectName: string }): Rule {
  return (tree: Tree): Observable<Tree> => {
    return from(getWorkspace(tree)).pipe(
      map((workspace) => {
        if (!workspace.projects.has(schema.projectName)) {
          throw new Error(
            `Project not found in workspace: [${schema.projectName}]`
          );
        }

        return tree;
      })
    );
  };
}
