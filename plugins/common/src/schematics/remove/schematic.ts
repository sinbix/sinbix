import { chain, Rule } from '@angular-devkit/schematics';
import { checkProjectExists, formatFiles } from '@sinbix/core/plugin-utils';
import {
  checkDependencies,
  checkTargets,
  normalizeOptions,
  removeProject,
  RemoveSchematicOptions,
  updateSinbixJson,
  updateTsconfig,
  updateWorkspace,
} from './utils';

export default function (options: RemoveSchematicOptions): Rule {
  const normalizedOptions = normalizeOptions(options);

  return chain([
    checkProjectExists(normalizedOptions),
    checkDependencies(normalizedOptions),
    checkTargets(normalizedOptions),
    removeProject(normalizedOptions),
    updateSinbixJson(normalizedOptions),
    updateTsconfig(normalizedOptions),
    updateWorkspace(normalizedOptions),
    formatFiles(normalizedOptions),
  ]);
}
