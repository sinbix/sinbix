import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LintBuilderSchema } from './schema';

export function runBuilder(
  options: LintBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  return of({ success: true }).pipe(tap(() => {
      context.logger.info("Builder ran for lint");
  }));
}

export default createBuilder(runBuilder);
