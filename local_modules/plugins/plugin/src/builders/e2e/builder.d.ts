import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import { Observable } from 'rxjs';
import { E2eBuilderOptions } from './utils';
export declare function runBuilder(options: E2eBuilderOptions, context: BuilderContext): Observable<BuilderOutput>;
declare const _default: import("@angular-devkit/architect/src/internal").Builder<E2eBuilderOptions>;
export default _default;
