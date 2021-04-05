import { BuilderContext } from '@angular-devkit/architect';
import { basename, join, normalize } from 'path';
import { NormalizedBuilderOptions } from './models';
import { writeJsonFile } from '@sinbix/core/src/utils/fileutils';
import { readJsonFile } from '@sinbix/core';

export function updatePackageJson(
  options: NormalizedBuilderOptions,
  context: BuilderContext
) {
  const packageJson = readJsonFile(
    join(context.workspaceRoot, options.packageJson)
  );

  if (options.main) {
    const mainFile = basename(options.main).replace(/\.[tj]s$/, '');
    const typingsFile = `${mainFile}.d.ts`;
    const mainJsFile = `${mainFile}.js`;

    packageJson.main = normalize(
      `./${options.relativeMainFileOutput}/${mainJsFile}`
    );
    packageJson.typings = normalize(
      `./${options.relativeMainFileOutput}/${typingsFile}`
    );
  }

  writeJsonFile(`${options.outputPath}/package.json`, packageJson);
}
