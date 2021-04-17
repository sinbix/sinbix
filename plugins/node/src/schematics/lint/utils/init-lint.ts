import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { addDepsToPackageJson } from '@sinbix/core/plugin-utils';
import {
  eslintConfigPrettierVersion,
  eslintVersion,
  typescriptESLintVersion,
} from '@sinbix/core/utils/versions';

export function initLint() {
  return (host: Tree) => {
    if (!host.exists('/.eslintrc.json')) {
      return chain([
        addDepsToPackageJson(
          {},
          {
            '@typescript-eslint/parser': typescriptESLintVersion,
            '@typescript-eslint/eslint-plugin': typescriptESLintVersion,
            eslint: eslintVersion,
            'eslint-config-prettier': eslintConfigPrettierVersion,
          }
        ),
        mergeWith(
          apply(url('./files-init'), [
            applyTemplates({
              dot: '.',
            }),
          ])
        ),
      ]);
    }
  };
}
