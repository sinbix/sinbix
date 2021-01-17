import {
  apply,
  chain,
  mergeWith,
  Rule,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';

import {
  getProjectConfig,
  updateWorkspace,
  addFiles,
  addDepsToPackageJson,
  typescriptESLintVersion,
  eslintVersion,
  eslintConfigPrettierVersion,
} from '@sinbix/devkit';

import { LintSchematicSchema } from './schema';

function initLint(options: LintSchematicSchema) {
  return (host: Tree) => {
    if (!host.exists('/.eslintrc.json')) {
      return chain([
        addDepsToPackageJson(
          {},
          {
            '@typescript-eslint/parser': typescriptESLintVersion,
            '@typescript-eslint/eslint-plugin': typescriptESLintVersion,
            'eslint': eslintVersion,
            'eslint-config-prettier': eslintConfigPrettierVersion,
          }
        ),
        mergeWith(
          apply(url('./init-files'), [
            template({
              dot: '.',
              tmpl: '',
            }),
          ])
        ),
      ]);
    }
  };
}

function addLintBuilder(options: LintSchematicSchema) {
  return (host: Tree) => {
    const project = options.project;
    return updateWorkspace((workspace) => {
      workspace.projects.get(project).targets.set('lint', {
        builder: '@sinbix/typescript:lint',
        options: {
          lintFilePatterns: [`${getProjectConfig(host, project).root}/**/*.ts`],
        },
      });
    });
  };
}

export default function (options: LintSchematicSchema): Rule {
  return chain([
    initLint(options),
    addFiles({ project: options.project }),
    addLintBuilder(options),
  ]);
}
