import {
  Rule,
} from "@angular-devkit/schematics";

import { LintSchematicSchema } from './schema';
import { addFiles } from "../..";

export default function(options: LintSchematicSchema): Rule {
  return addFiles(options.name);
}
