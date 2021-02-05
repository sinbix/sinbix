import { ProjectMoverSchematicOptions } from './models';

export function normalizeOptions(options: ProjectMoverSchematicOptions) {
  return {
    ...options,
  };
}
