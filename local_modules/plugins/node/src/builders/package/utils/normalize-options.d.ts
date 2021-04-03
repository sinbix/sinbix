import { BuilderContext } from '@angular-devkit/architect';
import { PackageBuilderOptions, NormalizedBuilderOptions } from './models';
export declare function normalizeOptions(options: PackageBuilderOptions, context: BuilderContext, libRoot: string): NormalizedBuilderOptions;
