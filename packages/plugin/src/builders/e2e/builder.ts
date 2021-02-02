import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { Observable, from, of } from 'rxjs';
import { concatMap, switchMap, tap } from 'rxjs/operators';
import { E2eBuilderOptions, normalizeOptions } from './utils';

try {
  require('dotenv').config();
} catch (e) {}

export function runBuilder(
  options: E2eBuilderOptions,
  context: BuilderContext
): Observable<BuilderOutput> {
  const normalizedOptions = normalizeOptions(options);
  // return of({ success: true }).pipe(
  //   switchMap(() => {
  //     return from(
  //       context.scheduleBuilder('@sinbix/node:jest', {
  //         jestConfig: normalizedOptions.jestConfig,
  //         watch: false,
  //       })
  //     ).pipe(concatMap((run) => run.output));
  //   })
  // );

  return from(
    context.scheduleBuilder('@sinbix/node:jest', {
      jestConfig: normalizedOptions.jestConfig,
      watch: false,
    })
  ).pipe(concatMap((run) => run.output));
}

export default createBuilder(runBuilder);
