import {
  chain,
  Rule,
} from "@angular-devkit/schematics";
import { setDefaultValues } from '@sinbix/common';
import { TypeSchematicSchema } from './schema';
import { addGitkeepInTree, updateSinbixJsonInTree } from "../..";
import { toFileName } from "../../workspace";

function normalizedOptions(options: TypeSchematicSchema): TypeSchematicSchema {
  options.name = toFileName(options.name);

  options = setDefaultValues(options, {
    directory: options.name,
  });

  return options;
}

export default function (options: TypeSchematicSchema): Rule {
  return () => {
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
