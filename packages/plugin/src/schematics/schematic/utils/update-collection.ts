import { Rule } from '@angular-devkit/schematics';
import { NormalizedOptions } from './models';
import { join } from 'path';
import { updateJsonInTree } from "@sinbix/common";

export function updateCollection(options: NormalizedOptions): Rule {
  return updateJsonInTree(
    join(options.projectConfig.root, 'collection.json'),
    (json) => {
      json.schematics[options.name] = {
        factory: `./src/schematics/${options.name}/schematic`,
        schema: `./src/schematics/${options.name}/schema.json`,
        description: options.description,
      };

      return json;
    }
  );
}
