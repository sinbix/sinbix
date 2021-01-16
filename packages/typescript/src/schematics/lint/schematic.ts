import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { getProjectConfig, updateWorkspace } from '@sinbix/devkit';
import { addFiles } from "@sinbix/common";

import { LintSchematicSchema } from './schema';

// function initLint() {
//   return (host: Tree) => {
//     const chainedCommands = [];
//
//     if (!host.exists('/.eslintrc.json')) {
//       chainedCommands.push((host: Tree) => {
//         host.create('/.eslintrc.json', globalESLint);
//
//         return addDepsToPackageJson(
//           {
//             ...(options.extraPackageDeps
//               ? options.extraPackageDeps.dependencies
//               : {}),
//           },
//           {
//             '@nrwl/eslint-plugin-nx': nxVersion,
//             '@typescript-eslint/parser': typescriptESLintVersion,
//             '@typescript-eslint/eslint-plugin': typescriptESLintVersion,
//             eslint: eslintVersion,
//             'eslint-config-prettier': eslintConfigPrettierVersion,
//             ...(options.extraPackageDeps
//               ? options.extraPackageDeps.devDependencies
//               : {}),
//           }
//         );
//       });
//     }
//   };
// }

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
    addFiles({ project: options.project }),
    addLintBuilder(options),
  ]);
}
