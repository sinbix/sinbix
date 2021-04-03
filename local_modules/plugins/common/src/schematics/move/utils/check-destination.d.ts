import { Rule } from '@angular-devkit/schematics';
import { NormalizedOptions } from './models';
/**
 * Checks whether the destination folder is valid
 *
 * - must not be outside the workspace
 * - must be a new folder
 *
 * @param options The options provided to the schematic
 */
export declare function checkDestination(options: NormalizedOptions): Rule;
