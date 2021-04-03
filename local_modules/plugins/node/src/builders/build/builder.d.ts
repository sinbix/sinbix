import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import { Observable } from 'rxjs';
import { BuildBuilderOptions } from './utils';
export declare function runBuilder(options: BuildBuilderOptions, context: BuilderContext): Observable<BuilderOutput>;
declare const _default: import("@angular-devkit/architect/src/internal").Builder<import("@angular-devkit/core").JsonObject>;
export default _default;
