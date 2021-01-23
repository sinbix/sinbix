import {
  apply,
  mergeWith,
  move,
  Rule,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';

import { setDefaultValues } from "../common";
import { names, toFileName } from "./name-utils";
import { getProjectConfig } from "./ast-utils";
import { offsetFromRoot } from './common';

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


  return (host: Tree) => {
    const { project, filesPath, options } = opts;
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
