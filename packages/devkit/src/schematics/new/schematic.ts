import {
  chain,
  move,
  Rule,
  schematic, SchematicContext, Tree
} from "@angular-devkit/schematics";
import { toFileName } from "@nrwl/workspace";

import { NewSchematicSchema } from './schema';

function normalizeOptions(options: NewSchematicSchema): NewSchematicSchema {
  options.name = toFileName(options.name);
  if (!options.directory) {
    options.directory = options.name;
  }

  return options;
}

export default function (options: NewSchematicSchema): Rule {
  options = normalizeOptions(options);

  const sinbixOpts = {
    ...options,
    layout: 'apps-and-libs',
    preset: undefined,
    nxCloud: undefined,
  };

  return (host: Tree, context: SchematicContext) => {
    return chain([
      schematic('sinbix', { ...sinbixOpts }),
      move('/', options.directory),
    ])(Tree.empty(), context);
  }
}
