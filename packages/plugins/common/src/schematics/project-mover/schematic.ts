import { chain, Rule } from '@angular-devkit/schematics';
import {
  moveProject,
  normalizeOptions,
  ProjectMoverSchematicOptions,
  updateImports,
  updateProjectConfig,
  updateProjectRootFiles,
} from './utils';

export default function (options: ProjectMoverSchematicOptions): Rule {
  const normalizedOptions = normalizeOptions(options);
  return chain([
    moveProject(normalizedOptions),
    updateProjectRootFiles(normalizedOptions),
    updateImports(normalizedOptions),
    updateProjectConfig(normalizedOptions),
  ]);
}
