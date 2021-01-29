import { chain, Rule, Tree } from '@angular-devkit/schematics';

import {
  addFiles,
  initLint,
  lintBuilder,
  LintSchematicOptions,
  normalizeOptions,
} from './utils';

export default function (options: LintSchematicOptions): Rule {
  return (host: Tree) => {
    const normalizedOptions = normalizeOptions(host, options);
    return chain([
      initLint(),
      lintBuilder(normalizedOptions),
      addFiles(normalizedOptions),
    ]);
  };
}
