import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
  scheduleTargetAndForget,
  targetFromTargetString,
} from '@angular-devkit/architect';
import { Observable, from } from 'rxjs';
import { switchMap, concatMap } from 'rxjs/operators';
import { E2eBuilderOptions, normalizeOptions } from './utils';

try {
  (async () => {
    (await import('dotenv')).config();
  })();
} catch (e) {}

function buildTarget(context: BuilderContext, target: string) {
  return scheduleTargetAndForget(context, targetFromTargetString(target));
}

export function runBuilder(
  options: E2eBuilderOptions,
  context: BuilderContext
): Observable<BuilderOutput> {
  const normalizedOptions = normalizeOptions(options);

  return from(
    context.scheduleBuilder('@sinbix/node:jest', {
      jestConfig: normalizedOptions.jestConfig,
      watch: false,
    })
  ).pipe(concatMap((run) => run.output));
}

export default createBuilder(runBuilder);
