import {
  chain, externalSchematic,
  Rule,
  SchematicContext,
  Tree
} from "@angular-devkit/schematics";
import { setDefaultValues } from '@sinbix/common';
import { TypeSchematicSchema } from './schema';
import { addGitkeepInTree, OptionsStore, schematicRule, updateSinbixJsonInTree } from "../..";
import { toFileName } from "../../workspace/utils/name-utils";

function normalizedOptions(options: TypeSchematicSchema): TypeSchematicSchema {
  options.name = toFileName(options.name);
  setDefaultValues(options, {
    directory: options.name,
  });

  return options;
}

export default function (options: TypeSchematicSchema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const { name, directory, type } = normalizedOptions(options);
    return chain([
      updateSinbixJsonInTree((json) => {
        json.projectTypes[name] = {
          type,
          directory,
        };
        return json;
      }),
      addGitkeepInTree(directory),
    ]);
  };
}
