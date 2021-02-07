import { addProjectToNxJsonInTree } from '@sinbix/utils';
import { NormalizedOptions } from './models';

export function addProjectToSinbix(options: NormalizedOptions) {
  return addProjectToNxJsonInTree(options.projectName, {
    tags: options.projectTags,
    implicitDependencies: options.projectDependencies,
  });
}
