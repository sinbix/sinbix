import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import { Observable } from 'rxjs';
import { JestBuilderOptions } from './utils';
export declare function runBuilder(options: JestBuilderOptions, context: BuilderContext): Observable<BuilderOutput>;
declare const _default: import("@angular-devkit/architect/src/internal").Builder<import("@angular-devkit/core").JsonObject>;
export default _default;
