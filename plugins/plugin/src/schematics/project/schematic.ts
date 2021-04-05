import { chain, Rule, Tree } from '@angular-devkit/schematics';
import {
  addFiles,
  e2eProject,
  initBuilder,
  initPlugin,
  initSchematic,
  nodeProject,
  normalizeOptions,
  ProjectSchematicOptions
} from "./utils";

export default function (options: ProjectSchematicOptions): Rule {
  return (host: Tree) => {
    const normalizedOptions = normalizeOptions(host, options);

    return chain([
      nodeProject(normalizedOptions),
      addFiles(normalizedOptions),
      initPlugin(normalizedOptions),
      initSchematic(normalizedOptions),
      initBuilder(normalizedOptions),
      e2eProject(normalizedOptions),
    ]);
  };
}
