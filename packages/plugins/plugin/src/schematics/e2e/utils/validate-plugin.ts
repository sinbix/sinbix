import { getProjectConfig } from '@sinbix/common';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { NormalizedOptions } from './models';

export function validatePlugin(host: Tree, options: NormalizedOptions) {
  const project = getProjectConfig(host, options.pluginName);
  if (!project) {
    throw new SchematicsException(
      `Project name "${options.pluginName}" doesn't not exist.`
    );
  }
}
