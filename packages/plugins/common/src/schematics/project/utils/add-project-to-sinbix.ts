import { addProjectToSinbixJsonInTree } from '@sinbix/utils';
import { NormalizedOptions } from './models';

export function addProjectToSinbix(options: NormalizedOptions) {
  return addProjectToSinbixJsonInTree(options.projectName, {
    tags: options.projectTags,
    implicitDependencies: options.projectDependencies,
  });
}
