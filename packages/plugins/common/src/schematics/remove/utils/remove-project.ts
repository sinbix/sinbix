import { Tree } from '@angular-devkit/schematics';
import { getProjectConfig } from '@sinbix/utils';
import { cleanDelete } from '../../../utils';
import { NormalizedOptions } from './models';

export function removeProject(options: NormalizedOptions) {
  return (host: Tree) => {
    return cleanDelete(getProjectConfig(host, options.projectName).root);
  };
}
