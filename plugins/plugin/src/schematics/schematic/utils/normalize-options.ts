import { Tree } from '@angular-devkit/schematics';
import { NormalizedOptions, SchematicSchematicOptions } from './models';
import { getNpmScope, normalizeProjectConfig, toFileName } from "@sinbix/core/plugin-utils";

export function normalizeOptions(
  host: Tree,
  options: SchematicSchematicOptions
): NormalizedOptions {
  const normalizedProjectConfig = normalizeProjectConfig(host, options.project);
  const npmScope = getNpmScope(host);
  const fileName = toFileName(options.name);

  const npmPackageName = `@${npmScope}/${fileName}`;

  let description: string;
  if (options.description) {
    description = options.description;
  } else {
    description = `${options.name} schematic`;
  }

  return {
    ...options,
    ...normalizedProjectConfig,
    fileName,
    description,
    npmScope,
    npmPackageName,
  };
}
