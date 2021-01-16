import {
  apply,
  mergeWith,
  move,
  Rule,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import * as _ from 'lodash';

import {
  SINBIX_FILE,
  SINBIX_PROJECT_TYPES_KEY,
  SINBIX_PROJECT_TYPES_TYPE_KEY,
} from '../sinbix';

import { ProjectType } from "@sinbix/devkit";

import {
  getProjectConfig,
  readJsonInTree,
} from "@sinbix/devkit";

import { offsetFromRoot } from "@sinbix/devkit";
import { names, toFileName } from "@sinbix/devkit";

import { setDefaultValues } from "../default-setter";

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

// export function getProjectConfig(host: Tree, name: string) {
//   const workspaceJson = readJsonInTree(host, getWorkspacePath(host));
//   const projectConfig = workspaceJson.projects[name];
//   if (!projectConfig) {
//     throw new Error(`Cannot find project '${name}'`);
//   } else {
//     return {
//       name,
//       ...projectConfig,
//     };
//   }
// }

export function normalizeProjectName(name: string) {
  return toFileName(name).replace(new RegExp('/', 'g'), '-');
}

export interface AddFilesOptions {
  project: string;
  filesPath?: string;
  options?: any;
}

export function addFiles(opts: AddFilesOptions): Rule {
  // throw new Error(JSON.stringify(opts, null, 2));

  opts = setDefaultValues(opts, {
    filesPath: './files'
  })

  const { project, filesPath, options } = opts;
  return (host: Tree) => {
    const projectConfig = getProjectConfig(host, normalizeProjectName(project));
    return mergeWith(
      apply(url(filesPath), [
        template({
          ...options,
          ...names(project),
          offsetFromRoot: offsetFromRoot(projectConfig.root),
          dot: '.',
          tmpl: '',
        }),
        move(projectConfig.root),
      ])
    );
  };
}
