import { chain, Rule, Tree } from '@angular-devkit/schematics';
import {
  addFiles,
  NormalizedOptions,
  normalizeOptions,
  updateBuilders,
  initBuilders,
} from './utils';

export default function (schema: NormalizedOptions): Rule {
  return (host: Tree) => {
    const options = normalizeOptions(host, schema);

    return chain([
      initBuilders(options),
      addFiles(options),
      updateBuilders(options),
    ]);
  };
}
