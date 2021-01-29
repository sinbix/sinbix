import { externalSchematic } from '@angular-devkit/schematics';
import { ProjectType } from '@sinbix/common';
import { NormalizedOptions } from './models';

export function addNodeProject(options: NormalizedOptions) {
  return externalSchematic('@sinbix/node', 'project', {
    name: options.name,
    directory: options.directory,
    tags: options.tags,
    type: ProjectType.Library,
    sourceRoot: 'src',
    testEnvironment: options.testEnvironment,
  });
}
