import { apply, mergeWith, move, Rule, template, Tree, url } from "@angular-devkit/schematics";
import * as _ from 'lodash';

import {
  SINBIX_FILE,
  SINBIX_PROJECT_TYPES_KEY,
  SINBIX_PROJECT_TYPES_TYPE_KEY,
} from '../sinbix';
import { ProjectType } from "../../../workspace/utils/project-type";
import { readJsonInTree } from "../../../workspace/utils/ast-utils";
import { getWorkspacePath } from "../../../workspace/utils/cli-config-utils";
import { offsetFromRoot } from "../../../workspace/utils/common";
import { names, toFileName } from "../../../workspace/utils/name-utils";

export function projectWorkspaceType(host: Tree, type: string): ProjectType {
  const workspace = _.get(
    readJsonInTree(host, SINBIX_FILE),
    `${SINBIX_PROJECT_TYPES_KEY}.${type}.${SINBIX_PROJECT_TYPES_TYPE_KEY}`
  );
  if (!workspace) {
    throw new Error(`ProjectType "${type}" is not found`);
  }
  return workspace;
}

export function getProjectConfig(host: Tree, name: string) {
  const workspaceJson = readJsonInTree(host, getWorkspacePath(host));
  const projectConfig = workspaceJson.projects[name];
  if (!projectConfig) {
    throw new Error(`Cannot find project '${name}'`);
  } else {
    return {
      name,
      ...projectConfig,
    };
  }
}

export function normalizeProjectName(name: string) {
  return toFileName(name).replace(new RegExp('/', 'g'), '-');
}

export function addFiles(name: string, options?: any): Rule {
  return (host:Tree) => {
    const projectConfig = getProjectConfig(host, normalizeProjectName(name));
    return mergeWith(
      apply(url(`./files`), [
        template({
          ...options,
          ...names(name),
          offsetFromRoot: offsetFromRoot(projectConfig.root),
          dot: '',
          tmpl: '',
        }),
        move(projectConfig.root),
      ])
    );
  }
}
