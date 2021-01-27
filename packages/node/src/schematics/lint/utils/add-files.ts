import {
  apply,
  applyTemplates,
  mergeWith,
  move,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { getProjectConfig, offsetFromRoot } from '@sinbix/common';
import { LintSchematicOptions } from './models';

export function addFiles(options: LintSchematicOptions) {
  return (host: Tree) => {
    const projectConfig = getProjectConfig(host, options.project);
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
