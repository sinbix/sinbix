import { Rule } from '@angular-devkit/schematics';
import { NormalizedOptions } from './models';
import { updateNxJsonInTree } from '@sinbix/common';

export function updateSinbix(options: NormalizedOptions): Rule {
  return updateNxJsonInTree((json) => {
    json.projects[options.projectName].implicitDependencies = [
      options.pluginName,
    ];
    return json;
  });
}
