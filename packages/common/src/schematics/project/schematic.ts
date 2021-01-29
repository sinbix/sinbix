import { chain, Tree } from '@angular-devkit/schematics';
import {
  addProjectToSinbix,
  addProjectToWorkspace,
  normalizeOptions,
  ProjectSchematicOptions,
} from './utils';

export default (options: ProjectSchematicOptions) => {
  return (host: Tree) => {
    const normalizedOptions = normalizeOptions(host, options);
    return chain([
      addProjectToWorkspace(normalizedOptions),
      addProjectToSinbix(normalizedOptions),
    ]);
  };
};
