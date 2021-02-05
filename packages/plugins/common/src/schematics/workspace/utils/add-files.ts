import {
  apply,
  applyTemplates,
  mergeWith,
  url,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import {
  angularCliVersion,
  eslintVersion,
  prettierVersion,
  sinbixVersion,
  typescriptVersion,
} from '@sinbix/core/src/utils/versions';
import { WorkspaceSchematicOptions } from './models';

export const DEFAULT_NRWL_PRETTIER_CONFIG = {
  singleQuote: true,
};

export function addFiles(options: WorkspaceSchematicOptions) {
  const npmScope = options.npmScope ? options.npmScope : options.name;

  return mergeWith(
    apply(url('./files'), [
      applyTemplates({
        utils: strings,
        dot: '.',
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
    ])
  );
}
