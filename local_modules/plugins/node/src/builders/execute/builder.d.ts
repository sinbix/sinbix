import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import { Observable } from 'rxjs';
import { ExecuteBuilderOptions } from './utils';
export declare function runBuilder(options: ExecuteBuilderOptions, context: BuilderContext): Observable<BuilderOutput>;
declare const _default: import("@angular-devkit/architect/src/internal").Builder<ExecuteBuilderOptions>;
export default _default;
