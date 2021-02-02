import { Rule } from '@angular-devkit/schematics';
import { updateJsonInTree } from '@sinbix/common';
import { NormalizedOptions } from './models';
import { join } from 'path';

export function updateBuilders(options: NormalizedOptions): Rule {
  return updateJsonInTree(
    join(options.projectConfig.root, 'builders.json'),
    (json) => {
      const builders = json.builders ? json.builders : {};
      builders[options.name] = {
        implementation: `./src/builders/${options.name}/builder`,
        schema: `./src/builders/${options.name}/schema.json`,
        description: options.description,
      };
      json.builders = builders;

      return json;
    }
  );
}