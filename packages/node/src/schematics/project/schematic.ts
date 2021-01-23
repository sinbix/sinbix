import {
  apply,
  chain,
  externalSchematic,
  mergeWith,
  move,
  Rule,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { getProjectConfig, normalizeProjectName, offsetFromRoot } from "@sinbix/common";
import { ProjectSchematicSchema } from './schema';

function addFiles(options: ProjectSchematicSchema) {
  return (host: Tree) => {
    const projectConfig = getProjectConfig(host, normalizeProjectName(options.name));
    return mergeWith(
      apply(url('./files'), [
        template({
          ...options,
          offsetFromRoot: offsetFromRoot(projectConfig.root),
          tmpl: '',
        }),
        move(projectConfig.root),
      ])
    );
  };
}

export default function (options: ProjectSchematicSchema): Rule {
  return chain([
    externalSchematic('@sinbix/common', 'project', options),
    addFiles(options),
  ]);
}
