import {
  chain,
  move,
  Rule,
  schematic,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { addTasks, NewSchematicOptions, normalizeOptions } from './utils';

export default function (options: NewSchematicOptions): Rule {
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
      addTasks(options),
    ])(Tree.empty(), context);
  };
}
