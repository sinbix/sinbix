import { Rule, SchematicsException } from '@angular-devkit/schematics';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { NormalizedOptions } from './models';
import { getDestination, normalizeSlashes } from './utils';

/**
 * Checks whether the destination folder is valid
 *
 * - must not be outside the workspace
 * - must be a new folder
 *
 * @param options The options provided to the schematic
 */
export function checkDestination(options: NormalizedOptions): Rule {
  return (tree: Tree) => {
    const INVALID_DESTINATION = `Invalid destination: [${options.destination}]`;

    if (options.destination.includes('..')) {
      throw new SchematicsException(
        `${INVALID_DESTINATION} - Please specify explicit path.`
      );
    }

    const destination = getDestination(options);

    if (tree.getDir(destination).subfiles.length > 0) {
      throw new SchematicsException(
        `${INVALID_DESTINATION} - Path is not empty.`
      );
    }

    if (options.destination.startsWith('/')) {
      options.destination = normalizeSlashes(options.destination.substr(1));
    }
  };
}
