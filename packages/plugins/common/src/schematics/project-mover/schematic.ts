import { chain, Rule } from '@angular-devkit/schematics';
import {
  moveProject,
  normalizeOptions,
  ProjectMoverSchematicOptions,
  updateProjectConfig,
} from './utils';

export default function (options: ProjectMoverSchematicOptions): Rule {
  const normalizedOptions = normalizeOptions(options);
  return chain([
    moveProject(normalizedOptions),
    updateProjectConfig(normalizedOptions),
  ]);
}
