import {
  chain,
  externalSchematic,
  Rule,
  schematic,
  Tree,
} from '@angular-devkit/schematics';
import { initPlugin, normalizeOptions, PluginSchematicOptions } from './utils';

export default function (options: PluginSchematicOptions): Rule {
  return (host: Tree) => {
    const normalizedOptions = normalizeOptions(host, options);

    return chain([
      externalSchematic('@sinbix/node', 'library', {
        ...options,
        publishable: true,
      }),
      initPlugin(normalizedOptions),
      schematic('schematic', {
        project: normalizedOptions.projectName,
        name: normalizedOptions.projectName,
        unitTestRunner: normalizedOptions.unitTestRunner,
      }),
      schematic('builder', {
        project: normalizedOptions.projectName,
        name: normalizedOptions.projectName,
        unitTestRunner: normalizedOptions.unitTestRunner,
      }),
    ]);
  };
}
