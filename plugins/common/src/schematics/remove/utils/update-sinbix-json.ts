import { SinbixJson } from '@sinbix/core';
import { updateJsonInTree } from '@sinbix/core/plugin-utils';
import { NormalizedOptions } from './models';

export function updateSinbixJson(options: NormalizedOptions) {
  return updateJsonInTree<SinbixJson>('sinbix.json', (json) => {
    delete json.projects[options.projectName];

    Object.values(json.projects).forEach((project) => {
      if (project.implicitDependencies) {
        project.implicitDependencies = project.implicitDependencies.filter(
          (dep) => dep !== options.projectName
        );
      }
    });

    return json;
  });
}
