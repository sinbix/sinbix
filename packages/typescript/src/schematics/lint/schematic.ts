import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { addFiles, getProjectConfig, updateWorkspace } from '@sinbix/devkit';

import { LintSchematicSchema } from './schema';

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
  return chain([addFiles(options.project), addLintBuilder(options)]);
}
