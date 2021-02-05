import { externalSchematic } from '@angular-devkit/schematics';
import { ProjectType } from '@sinbix/common';
import { NormalizedOptions } from './models';

export function addNodeProject(options: NormalizedOptions) {
  return externalSchematic('@sinbix/node', 'project', {
    name: options.projectRoot,
    directory: "",
    tags: options.projectTags.join(','),
    type: ProjectType.Library,
    sourceRoot: 'src',
    testEnvironment: options.testEnvironment,
  });
}
