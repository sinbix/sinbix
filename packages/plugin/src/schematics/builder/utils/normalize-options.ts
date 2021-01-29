import { Tree } from '@angular-devkit/schematics';
import { NormalizedOptions, BuilderSchematicOptions } from './models';
import {
  getNpmScope,
  normalizeProjectConfig,
  toFileName,
} from '@sinbix/common';

export function normalizeOptions(
  host: Tree,
  options: BuilderSchematicOptions
): NormalizedOptions {
  const normalizedProjectConfig = normalizeProjectConfig(host, options.project);
  const npmScope = getNpmScope(host);
  const fileName = toFileName(options.name);

  let description: string;
  if (options.description) {
    description = options.description;
  } else {
    description = `${options.name} builder`;
  }

  return {
    ...options,
    ...normalizedProjectConfig,
    fileName,
    description,
    npmScope,
  };
}
