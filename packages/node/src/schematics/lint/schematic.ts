import { chain, Rule } from '@angular-devkit/schematics';

import { addFiles, initLint, lintBuilder, LintSchematicOptions } from './utils';

export default function (options: LintSchematicOptions): Rule {
  return chain([initLint(), lintBuilder(options), addFiles(options)]);
}
