import { BuilderContext } from '@angular-devkit/architect';
import * as glob from 'glob';
import { basename, dirname, join, relative } from 'path';
import {
  FileInputOutput,
  PackageBuilderOptions,
  NormalizedBuilderOptions,
} from './models';

export function normalizeOptions(
  options: PackageBuilderOptions,
  context: BuilderContext,
  libRoot: string
): NormalizedBuilderOptions {
  const outDir = options.outputPath;
  const files: FileInputOutput[] = [];

  const globbedFiles = (pattern: string, input = '', ignore: string[] = []) => {
    return glob.sync(pattern, {
      cwd: input,
      nodir: true,
      ignore,
    });
  };

  options.assets.forEach((asset) => {
    if (typeof asset === 'string') {
      globbedFiles(asset, context.workspaceRoot).forEach((globbedFile) => {
        files.push({
          input: join(context.workspaceRoot, globbedFile),
          output: join(context.workspaceRoot, outDir, basename(globbedFile)),
        });
      });
    } else {
      globbedFiles(
        asset.glob,
        join(context.workspaceRoot, asset.input),
        asset.ignore
      ).forEach((globbedFile) => {
        files.push({
          input: join(context.workspaceRoot, asset.input, globbedFile),
          output: join(
            context.workspaceRoot,
            outDir,
            asset.output,
            globbedFile
          ),
        });
      });
    }
  });

  const rootDir = libRoot || '';

  const relativeMainFileOutput = options.main
    ? relative(rootDir, dirname(options.main))
    : null;

  if (options.buildableProjectDepsInPackageJsonType == undefined) {
    options.buildableProjectDepsInPackageJsonType = 'dependencies';
  }

  return {
    ...options,
    files,
    relativeMainFileOutput,
    normalizedOutputPath: join(context.workspaceRoot, options.outputPath),
  };
}
