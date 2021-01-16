import {
  chain,
  externalSchematic,
  Rule,
} from '@angular-devkit/schematics';
import { ProjectTsSchematicSchema } from './schema';
import { addFiles, normalizeProjectName } from "../..";

export default function (options: ProjectTsSchematicSchema): Rule {
  return chain([
    externalSchematic('@sinbix/devkit', 'project', options),
    addFiles({project: options.name, options}),

    externalSchematic('@sinbix/devkit', 'lint', {
      name: normalizeProjectName(options.name)
    })
  ]);
}
