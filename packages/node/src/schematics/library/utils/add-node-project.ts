import { externalSchematic } from '@angular-devkit/schematics';
import { ProjectType } from '@sinbix/common';
import { LibrarySchematicOptions } from './models';

export function addNodeProject(options: LibrarySchematicOptions) {
  return externalSchematic('@sinbix/node', 'project', {
    name: options.name,
    directory: options.directory,
    tags: options.tags,
    type: ProjectType.Library,
    sourceRoot: 'src',
    testEnvironment: options.testEnvironment,
  });
}
