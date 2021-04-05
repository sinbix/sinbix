import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { NormalizedOptions } from './models';

export function validateOptions(host: Tree, options: NormalizedOptions) {
  if (options.publishable && !options.importPath) {
    throw new SchematicsException(
      `For publishable libs you have to provide a proper "--importPath" which needs to be a valid npm package name (e.g. my-awesome-lib or @myorg/my-lib)`
    );
  }
}
