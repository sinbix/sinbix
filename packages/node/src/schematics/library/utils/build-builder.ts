import { LibrarySchematicOptions } from './models';
import { noop, Rule, Tree } from '@angular-devkit/schematics';
import {
  getProjectConfig,
  normalizeProjectName,
  updateWorkspaceInTree,
} from '@sinbix/common';

export function buildBuilder(options: LibrarySchematicOptions): Rule {
  return (host: Tree) => {
    const projectName = normalizeProjectName(options.name);

    const projectConfig = getProjectConfig(host, projectName);

    return options.publishable
      ? updateWorkspaceInTree((json) => {
          const architect = json.projects[projectName].architect;
          if (architect) {
            architect['build-base'] = {
              builder: '@sinbix/node:package',
              options: {
                outputPath: `dist/${projectConfig.root}`,
                tsConfig: `${projectConfig.root}/tsconfig.lib.json`,
                packageJson: `${projectConfig.root}/package.json`,
                main: `${projectConfig.root}/src/index.ts`,
                assets: [`${projectConfig.root}/*.md`],
              },
            };
            architect['build'] = {
              builder: '@sinbix/common:commands',
              outputs: [`dist/${projectConfig.root}`],
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
  };
}
