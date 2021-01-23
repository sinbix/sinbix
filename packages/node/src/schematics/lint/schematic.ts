import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';

import {
  getProjectConfig,
  updateWorkspace,
  addDepsToPackageJson,
  offsetFromRoot,
} from '@sinbix/common';

import {
  typescriptESLintVersion,
  eslintVersion,
  eslintConfigPrettierVersion,
} from '@sinbix/core/versions';

import { LintSchematicSchema } from './schema';

function initLint() {
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
        builder: '@sinbix/node:lint',
        options: {
          lintFilePatterns: [`${getProjectConfig(host, project).root}/**/*.ts`],
        },
      });
    });
  };
}

function addFiles(options: LintSchematicSchema) {
  return (host: Tree) => {
    const projectConfig = getProjectConfig(host, options.project);
    return mergeWith(
      apply(url('./files'), [
        template({
          ...options,
          offsetFromRoot: offsetFromRoot(projectConfig.root),
          dot: '.',
          tmpl: '',
        }),
        move(projectConfig.root),
      ])
    );
  };
}

export default function (options: LintSchematicSchema): Rule {
  return chain([initLint(), addLintBuilder(options), addFiles(options)]);
}
