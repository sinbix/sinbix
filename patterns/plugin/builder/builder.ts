import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { normalizeOptions, PatternBuilderOptions } from './utils';

export function runBuilder(
  options: PatternBuilderOptions,
  context: BuilderContext
): Observable<BuilderOutput> {
  const normalizedOptions = normalizeOptions(options);
  return of({ success: true }).pipe(
    tap(() => {
      context.logger.info('Builder ran for pattern');
    })
  );
}

export default createBuilder(runBuilder);
