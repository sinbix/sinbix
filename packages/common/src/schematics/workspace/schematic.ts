import {
  apply,
  branchAndMerge,
  chain,
  mergeWith,
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from "@angular-devkit/schematics";
import { WorkspaceSchematicSchema } from './schema';
import { strings } from '@angular-devkit/core';
import {
  angularCliVersion,
  eslintVersion,
  sinbixVersion,
  prettierVersion,
  typescriptVersion,
} from '@sinbix/core/versions';
import { updateJsonInTree } from "../../utils";


export const DEFAULT_NRWL_PRETTIER_CONFIG = {
  singleQuote: true,
};

function setWorkspaceLayoutProperties(options: WorkspaceSchematicSchema) {
  return updateJsonInTree('nx.json', (json) => {
    if (options.layout === 'packages') {
      json.workspaceLayout = {
        appsDir: 'packages',
        libsDir: 'packages',
      };
    }
    return json;
  });
}

function createAppsAndLibsFolders(options: WorkspaceSchematicSchema) {
  return (host: Tree) => {
    if (options.layout === 'packages') {
      host.create('packages/.gitkeep', '');
    } else {
      host.create('apps/.gitkeep', '');
      host.create('libs/.gitkeep', '');
    }
  };
}

export default function (options: WorkspaceSchematicSchema): Rule {
  if (!options.name) {
    throw new Error(`Invalid options, "name" is required.`);
  }

  return (host: Tree, context: SchematicContext) => {
    const npmScope = options.npmScope ? options.npmScope : options.name;
    const templateSource = apply(url('./files'), [
      template({
        utils: strings,
        dot: '.',
        tmpl: '',
        workspaceFile: 'workspace',
        cliCommand: 'nx',
        nxCli: false,
        typescriptVersion,
        prettierVersion,
        eslintVersion,
        // angular cli is used only when workspace schematics is added to angular cli
        angularCliVersion,
        ...options,
        sinbixVersion,
        npmScope,
        defaultNrwlPrettierConfig: JSON.stringify(
          DEFAULT_NRWL_PRETTIER_CONFIG,
          null,
          2
        ),
      }),
    ]);
    return chain([
      branchAndMerge(
        chain([
          mergeWith(templateSource),
          setWorkspaceLayoutProperties(options),
          createAppsAndLibsFolders(options)
        ])
      ),
    ])(host, context);
  };
}
