import { NormalizedOptions } from './models';
import {
  apply,
  applyTemplates,
  chain,
  filter,
  MergeStrategy,
  mergeWith,
  move,
  noop,
  Rule,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { names, offsetFromRoot } from '@sinbix/utils';
import { join } from 'path';

export function addFiles(options: NormalizedOptions): Rule {
  return chain([
    addBase(options),
    options.publishable ? addPublishable(options) : noop(),
    options.readme ? addReadme(options) : noop(),
    options.main ? addMain(options) : noop(),
  ]);
  // return mergeWith(
  //   apply(url(`./files/base`), [
  //     applyTemplates({
  //       ...options,
  //       ...names(options.name),
  //       offsetFromRoot: offsetFromRoot(options.projectRoot),
  //     }),
  //     move(options.projectRoot),

  //     // options.publishable
  //     //   ? noop()
  //     //   : filter((file) => !file.endsWith('package.json')),
  //   ])
  // );
}

function addBase(options: NormalizedOptions) {
  return mergeWith(
    apply(url(`./files/base`), [
      applyTemplates({
        ...options,
        offsetFromRoot: offsetFromRoot(options.projectRoot),
      }),
      move(options.projectRoot),
    ])
  );
}

function addPublishable(options: NormalizedOptions) {
  return mergeWith(
    apply(url(`./files/publishable`), [
      applyTemplates({
        ...options,
      }),
      move(options.projectRoot),
    ])
  );
}

function addReadme(options: NormalizedOptions) {
  return mergeWith(
    apply(url(`./files/readme`), [
      applyTemplates({
        ...options,
      }),
      move(options.projectRoot),
    ])
  );
}

function addMain(options: NormalizedOptions) {
  return (host: Tree) => {
    host.create(join(options.projectRoot, options.main), '');
  };
}
