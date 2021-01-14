import { chain, Rule, Tree } from '@angular-devkit/schematics';

import { addFiles } from '../..';

import { LintSchematicSchema } from './schema';
import { getProjectConfig, updateWorkspace } from '../../workspace';

function addLintBuilder(options: LintSchematicSchema) {
  return (host: Tree) => {
    const name = options.name;
    return updateWorkspace((workspace) => {
      workspace.projects.get(name).targets.set('lint', {
        builder: '@nrwl/linter:eslint',
        options: {
          lintFilePatterns: [`${getProjectConfig(host, name).root}/**/*.ts`],
        },
      });
    });
  };
}

export default function (options: LintSchematicSchema): Rule {
  return chain([addFiles(options.name), addLintBuilder(options)]);
}
