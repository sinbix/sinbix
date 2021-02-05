import { ProjectMoverSchematicOptions } from './models';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';

export function normalizeOptions(
  host: Tree,
  options: ProjectMoverSchematicOptions
) {
  return {
    ...options,
  };
}
