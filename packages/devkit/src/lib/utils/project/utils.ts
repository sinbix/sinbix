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
import { ProjectType } from "../../../workspace";
import {
  getProjectConfig,
  readJsonInTree,
} from "../../../workspace";
import { offsetFromRoot } from "../../../workspace";
import { names, toFileName } from "../../../workspace";
import { setDefaultValues } from "@sinbix/common";

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
