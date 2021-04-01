import { SinbixJson } from '@sinbix/core';
import { updateJsonInTree } from '@sinbix/utils';
import { NormalizedOptions } from './models';

/**
 * Updates the nx.json file to remove the project
 *
 * @param options The options provided to the schematic
 */
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
