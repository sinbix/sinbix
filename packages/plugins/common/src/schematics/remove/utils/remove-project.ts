import { Tree } from '@angular-devkit/schematics';
import { getProjectConfig } from '@sinbix/utils';
import { cleanDelete } from '../../../utils';
import { NormalizedOptions } from './models';

/**
 * Removes (deletes) a project from the folder tree
 *
 * @param options The options provided to the schematic
 */
export function removeProject(options: NormalizedOptions) {
  return (host: Tree) => {
    return cleanDelete(getProjectConfig(host, options.projectName).root);
  };
}
