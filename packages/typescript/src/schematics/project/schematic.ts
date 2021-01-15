import {
  chain,
  externalSchematic,
  Rule,
} from '@angular-devkit/schematics';
import { addFiles, normalizeProjectName } from "@sinbix/devkit";
import { ProjectSchematicSchema } from './schema';

export default function (options: ProjectSchematicSchema): Rule {
  return chain([
    externalSchematic('@sinbix/devkit', 'project', options),
    addFiles(options.name, options),

    externalSchematic('@sinbix/typescript', 'lint', {
      project: normalizeProjectName(options.name)
    })
  ]);
}
