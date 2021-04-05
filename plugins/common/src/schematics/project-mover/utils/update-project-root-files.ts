import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { appRootPath } from '@sinbix/core/src/utils/app-root';
import { getProjectConfig } from '@sinbix/utils';
import { getDestination } from '@sinbix/utils';
import * as path from 'path';
import { NormalizedOptions } from './models';

/**
 * Updates the files in the root of the project
 *
 * Typically these are config files which point outside of the project folder
 *
 * @param options The options provided to the schematic
 */
export function updateProjectRootFiles(options: NormalizedOptions) {
  return (host: Tree) => {
    const project = getProjectConfig(host, options.projectName);
    const destination = getDestination(options.destination);

    const newRelativeRoot = path
      .relative(path.join(appRootPath, destination), appRootPath)
      .split(path.sep)
      .join('/');

    const oldRelativeRoot = path
      .relative(path.join(appRootPath, project.root), appRootPath)
      .split(path.sep)
      .join('/');

    if (newRelativeRoot === oldRelativeRoot) {
      return;
    }

    const dots = /\./g;
    const regex = new RegExp(oldRelativeRoot.replace(dots, '\\.'), 'g');

    const isRootFile = new RegExp(`${options.destination}/[^/]+.js*`);
    const projectDir = host.getDir(destination);
    projectDir.visit((file) => {
      if (!isRootFile.test(file)) {
        return;
      }

      const oldContent = host.read(file).toString();
      const newContent = oldContent.replace(regex, newRelativeRoot);
      host.overwrite(file, newContent);
    });
  };
}
