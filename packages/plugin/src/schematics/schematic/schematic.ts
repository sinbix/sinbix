import { chain, Rule, Tree } from '@angular-devkit/schematics';
import {
  addFiles,
  NormalizedOptions,
  normalizeOptions,
  updateCollection,
  initCollection,
} from './utils';

export default function (schema: NormalizedOptions): Rule {
  return (host: Tree) => {
    const options = normalizeOptions(host, schema);

    return chain([
      initCollection(options),
      addFiles(options),
      updateCollection(options),
    ]);
  };
}
