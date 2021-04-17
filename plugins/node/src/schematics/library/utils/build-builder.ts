import { NormalizedOptions } from './models';
import { noop, Rule } from '@angular-devkit/schematics';
import { updateWorkspaceInTree } from '@sinbix/core/plugin-utils';
import { join } from 'path';

export function buildBuilder(options: NormalizedOptions): Rule {
  const projectName = options.projectName;

  return options.publishable
    ? updateWorkspaceInTree((json) => {
        const architect = json.projects[projectName].architect;
        if (architect) {
          architect['build-base'] = {
            builder: '@sinbix/node:package',
            options: {
              outputPath: `dist/${options.projectRoot}`,
              tsConfig: `${options.projectRoot}/tsconfig.lib.json`,
              packageJson: `${options.projectRoot}/package.json`,
              main: options.main
                ? join(options.projectRoot, options.main)
                : undefined,
              assets: [`${options.projectRoot}/*.md`],
            },
          };
          architect['build'] = {
            builder: '@sinbix/common:commands',
            outputs: [`dist/${options.projectRoot}`],
            options: {
              commands: [
                {
                  command: `npx sinbix build-base ${projectName}`,
                },
              ],
              parallel: false,
            },
          };
        }
        return json;
      })
    : noop();
}
