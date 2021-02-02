import { NormalizedOptions, PatternBuilderOptions } from './models';

export function normalizeOptions(
  options: PatternBuilderOptions
): NormalizedOptions {
  return {
    ...options,
  };
}
