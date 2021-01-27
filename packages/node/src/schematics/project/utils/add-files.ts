import {
  apply,
  applyTemplates,
  mergeWith,
  move,
  Tree,
  url,
} from '@angular-devkit/schematics';
import {
  getProjectConfig,
  normalizeProjectName,
  offsetFromRoot,
} from '@sinbix/common';
import { ProjectSchematicOptions } from './models';

export function addFiles(options: ProjectSchematicOptions) {
  return (host: Tree) => {
    const projectConfig = getProjectConfig(
      host,
      normalizeProjectName(options.name)
    );
    return mergeWith(
      apply(url('./files'), [
        applyTemplates({
          ...options,
          offsetFromRoot: offsetFromRoot(projectConfig.root),
          dot: '.',
        }),
        move(projectConfig.root),
      ])
    );
  };
}
