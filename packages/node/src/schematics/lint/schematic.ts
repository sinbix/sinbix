import {
  apply, applyTemplates,
  chain,
  mergeWith,
  move,
  Rule,
  Tree,
  url
} from "@angular-devkit/schematics";

import {
  getProjectConfig,
  addDepsToPackageJson,
  offsetFromRoot,
  updateWorkspaceInTree,
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
            applyTemplates({
              dot: '.',
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
    return updateWorkspaceInTree((workspace) => {
      const architect = workspace.projects[project].architect;

      if (architect) {
        architect['lint'] = {
          builder: '@sinbix/node:lint',
          options: {
            lintFilePatterns: [
              `${getProjectConfig(host, project).root}/**/*.ts`,
            ],
          },
        };
      }

      return workspace;
    });
  };
}

function addFiles(options: LintSchematicSchema) {
  return (host: Tree) => {
    const projectConfig = getProjectConfig(host, options.project);
    return mergeWith(
      apply(url('./files'), [
        applyTemplates({
          ...options,
          offsetFromRoot: offsetFromRoot(projectConfig.root),
          dot: '.',
        }),
        move(projectConfig.root),
      ])
    );
  };
}

export default function (options: LintSchematicSchema): Rule {
  return chain([initLint(), addLintBuilder(options), addFiles(options)]);
}
