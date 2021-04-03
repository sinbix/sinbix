import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import { LintBuilderOptions } from './utils';
export declare function runBuilder(options: LintBuilderOptions, context: BuilderContext): Promise<BuilderOutput>;
declare const _default: import("@angular-devkit/architect/src/internal").Builder<import("@angular-devkit/core").JsonObject>;
export default _default;
