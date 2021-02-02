import {
  chain,
  externalSchematic,
  Rule,
  schematic,
  Tree,
} from '@angular-devkit/schematics';
import { initPlugin, normalizeOptions, ProjectSchematicOptions } from './utils';

export default function (options: ProjectSchematicOptions): Rule {
  return (host: Tree) => {
    const normalizedOptions = normalizeOptions(host, options);

    return chain([
      externalSchematic('@sinbix/node', 'library', {
        ...options,
        name: normalizedOptions.projectRoot,
        directory: '',
        tags: ["plugin", ...normalizedOptions.projectTags].join(','),
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
      schematic('e2e', {
        pluginName: normalizedOptions.projectName,
        npmPackageName: normalizedOptions.importPath,
        pluginOutputPath: `dist/${normalizedOptions.projectRoot}`
      })
    ]);
  };
}
