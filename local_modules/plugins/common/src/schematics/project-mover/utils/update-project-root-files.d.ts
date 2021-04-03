import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { NormalizedOptions } from './models';
/**
 * Updates the files in the root of the project
 *
 * Typically these are config files which point outside of the project folder
 *
 * @param options The options provided to the schematic
 */
export declare function updateProjectRootFiles(options: NormalizedOptions): (host: Tree) => void;
