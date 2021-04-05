import { E2eBuilderOptions, NormalizedOptions } from './models';

export function normalizeOptions(
  options: E2eBuilderOptions
): NormalizedOptions {
  return {
    ...options,
  };
}
