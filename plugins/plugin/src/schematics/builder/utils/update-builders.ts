import { Rule } from '@angular-devkit/schematics';
import { updateJsonInTree } from '@sinbix/utils';
import { NormalizedOptions } from './models';
import { join } from 'path';

export function updateBuilders(options: NormalizedOptions): Rule {
  return updateJsonInTree(
    join(options.projectConfig.root, 'builders.json'),
    (json) => {
      json.builders[options.name] = {
        implementation: `./builders/${options.name}/builder`,
        schema: `./builders/${options.name}/schema.json`,
        description: options.description,
      };
      return json;
    }
  );
}
