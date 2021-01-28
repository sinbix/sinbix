import { Tree } from '@angular-devkit/schematics';
import { NormalizedOptions, BuilderSchematicOptions } from './models';
import { getNpmScope, getProjectConfig, toFileName } from '@sinbix/common';

export function normalizeOptions(
  host: Tree,
  options: BuilderSchematicOptions
): NormalizedOptions {
  const npmScope = getNpmScope(host);
  const fileName = toFileName(options.name);

  const { root: projectRoot, sourceRoot: projectSourceRoot } = getProjectConfig(
    host,
    options.project
  );

  let description: string;
  if (options.description) {
    description = options.description;
  } else {
    description = `${options.name} builder`;
  }

  return {
    ...options,
    fileName,
    description,
    projectRoot,
    projectSourceRoot,
    npmScope,
  };
}
