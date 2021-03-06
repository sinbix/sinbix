import { updateJsonInTree } from '@sinbix/core/plugin-utils';
import { NormalizedOptions } from './models';
import { join } from 'path';

export function updateTsConfig(options: NormalizedOptions) {
  return updateJsonInTree(
    join(options.projectRoot, 'tsconfig.json'),
    (json) => {
      json.include = ['**/*.ts'];
      return json;
    }
  );
}
