import { chain, Rule } from '@angular-devkit/schematics';
import { normalizeOptions, ProjectMoverSchematicOptions } from './utils';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';

export default function (options: ProjectMoverSchematicOptions): Rule {
  return (host: Tree) => {
    const normalizedOptions = normalizeOptions(host, options);
    return chain([]);
  };
}
