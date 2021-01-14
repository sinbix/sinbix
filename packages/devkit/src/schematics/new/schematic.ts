import {
  chain,
  move,
  Rule,
  schematic,
  SchematicContext,
  Tree
} from "@angular-devkit/schematics";

import { NewSchematicSchema } from './schema';
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";
import { toFileName } from "../../workspace/utils/name-utils";

function normalizeOptions(options: NewSchematicSchema): NewSchematicSchema {
  options.name = toFileName(options.name);
  if (!options.directory) {
    options.directory = options.name;
  }

  return options;
}

export function addTasks(options): Rule {
  return (host: Tree, context: SchematicContext) => {
    let packageTask;
    if (!options.skipInstall) {
      packageTask = context.addTask(
        new NodePackageInstallTask(options.directory)
      );
    }
  }
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
      addTasks(options)
    ])(Tree.empty(), context);
  }
}
