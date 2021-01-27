import {
  apply,
  applyTemplates,
  mergeWith,
  move,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { getProjectConfig, offsetFromRoot } from '@sinbix/common';
import { JestSchematicOptions } from './models';

export function addFiles(options: JestSchematicOptions) {
  return (host: Tree) => {
    const projectConfig = getProjectConfig(host, options.project);
    return mergeWith(
      apply(url('./files'), [
        applyTemplates({
          ...options,
          offsetFromRoot: offsetFromRoot(projectConfig.root),
          projectRoot: projectConfig.root,
          dot: '.',
        }),
        move(projectConfig.root),
      ])
    );
  };
}
