import * as _ from 'lodash';
import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';


import { SinbixJson, SinbixJsonProjectConfig } from './types';
import { SINBIX_FILE, SINBIX_PROJECT_TYPES_DIRECTORY_KEY, SINBIX_PROJECT_TYPES_KEY } from "./constants";
import { serializeJson } from "../../../workspace/utils/fileutils";
import { addProjectToNxJsonInTree, readJsonInTree } from "../../../workspace/utils/ast-utils";

export function updateSinbixJsonInTree(
  callback: (json: SinbixJson, context: SchematicContext) => SinbixJson
): Rule {
  return (host: Tree, context: SchematicContext): Tree => {
    host.overwrite(
      SINBIX_FILE,
      serializeJson(callback(readJsonInTree(host, SINBIX_FILE), context))
    );
    return host;
  };
}

export function typeRootDir(host: Tree, type: string) {
  const typeDirectory = _.get(
    readJsonInTree(host, SINBIX_FILE),
    `${SINBIX_PROJECT_TYPES_KEY}.${type}.${SINBIX_PROJECT_TYPES_DIRECTORY_KEY}`
  );
  if (!typeDirectory) {
    throw new Error(`ProjectType "${type} is not found`);
  }
  return typeDirectory;
}

export function addSinbixToSinbixJsonInTree(
  projectName,
  options: SinbixJsonProjectConfig
): Rule {
  return chain([
    addProjectToNxJsonInTree(projectName, options),
    updateSinbixJsonInTree((json) => {
      const { type } = options;
      json.projects[projectName] = {
        type,
      };
      return json;
    }),
  ]);
}
