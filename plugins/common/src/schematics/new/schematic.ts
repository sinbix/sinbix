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
  const normalizedOptions = normalizeOptions(options);

  const workspaceOpts = {
    ...normalizedOptions,
    layout: 'apps-and-libs',
    preset: undefined
  };

  return (host: Tree, context: SchematicContext) => {
    return chain([
      schematic('workspace', { ...workspaceOpts }),
      move('/', normalizedOptions.directory),
      addTasks(normalizedOptions),
    ])(Tree.empty(), context);
  };
}
