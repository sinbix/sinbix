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
import { SinbixSchematicSchema } from './schema';
import { strings } from '@angular-devkit/core';
import {
  angularCliVersion,
  eslintVersion,
  nxVersion,
  prettierVersion,
  typescriptVersion,
} from '../../lib/utils';
import { updateJsonInTree } from "../../workspace";

export const DEFAULT_NRWL_PRETTIER_CONFIG = {
  singleQuote: true,
};

function setWorkspaceLayoutProperties(options: SinbixSchematicSchema) {
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

function createAppsAndLibsFolders(options: SinbixSchematicSchema) {
  return (host: Tree) => {
    if (options.layout === 'packages') {
      host.create('packages/.gitkeep', '');
    } else {
      host.create('apps/.gitkeep', '');
      host.create('libs/.gitkeep', '');
    }
  };
}

export default function (options: SinbixSchematicSchema): Rule {
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
        nxVersion,
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
