import { Tree } from '@angular-devkit/schematics';
import { NormalizedOptions, E2eSchematicOptions } from './models';
import { getNpmScope, getProjectConfig } from '@sinbix/utils';
import { normalizeProject } from '@sinbix/utils';

export function normalizeOptions(
  host: Tree,
  options: E2eSchematicOptions
): NormalizedOptions {
  const projectConfig = getProjectConfig(host, options.pluginName);

  const normalizedProject = normalizeProject({
    name: projectConfig.root,
    directory: options.directory,
    tags: "e2e",
  });

  const npmScope = getNpmScope(host);
  return {
    ...options,
    ...normalizedProject,
    npmScope,
  };
}
