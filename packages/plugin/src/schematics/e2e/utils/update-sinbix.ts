import { Rule } from '@angular-devkit/schematics';
import { addProjectToNxJsonInTree } from '@nrwl/workspace';
import { NormalizedOptions } from './models';

export function updateSinbix(options: NormalizedOptions): Rule {
  return addProjectToNxJsonInTree(options.projectName, {
    tags: [],
    implicitDependencies: [options.pluginName],
  });
}
