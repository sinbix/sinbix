import {
  chain,
  move,
  Rule,
  schematic,
  SchematicContext,
  Tree
} from "@angular-devkit/schematics";

import { NodePackageInstallTask, RepositoryInitializerTask } from "@angular-devkit/schematics/tasks";
import { toFileName } from "../../utils";
import { NewSchematicSchema } from './schema';

function normalizeOptions(options: NewSchematicSchema): NewSchematicSchema {
  options.name = toFileName(options.name);
  if (!options.directory) {
    options.directory = options.name;
  }

  return options;
}

export function addTasks(options): Rule {
  return (host: Tree, context: SchematicContext) => {
    if (!options.skipInstall) {
      context.addTask(
        new NodePackageInstallTask(options.directory)
      );
    }
    if (!options.skipGit) {
      const commit =
        typeof options.commit == 'object'
          ? options.commit
          : !!options.commit
          ? {}
          : false;
      context.addTask(
        new RepositoryInitializerTask(options.directory, commit)
      );
    }
  }
}

export default function (options: NewSchematicSchema): Rule {
  options = normalizeOptions(options);

  const workspaceOpts = {
    ...options,
    layout: 'apps-and-libs',
    preset: undefined,
    nxCloud: undefined,
  };

  return (host: Tree, context: SchematicContext) => {
    return chain([
      schematic('workspace', { ...workspaceOpts }),
      move('/', options.directory),
      addTasks(options)
    ])(Tree.empty(), context);
  }
}
