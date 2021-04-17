import { Rule } from '@angular-devkit/schematics';
import { NormalizedOptions } from './models';
import { updateSinbixJsonInTree } from '@sinbix/core/plugin-utils';

export function updateSinbix(options: NormalizedOptions): Rule {
  return updateSinbixJsonInTree((json) => {
    json.projects[options.projectName].implicitDependencies = [
      options.pluginName,
    ];
    return json;
  });
}
