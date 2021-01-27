import { chain, Rule } from '@angular-devkit/schematics';
import { addFiles, WorkspaceSchematicOptions } from './utils';

export default function (options: WorkspaceSchematicOptions): Rule {
  if (!options.name) {
    throw new Error(`Invalid options, "name" is required.`);
  }

  return chain([addFiles(options)]);
}
