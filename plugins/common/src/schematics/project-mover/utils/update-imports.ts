import { chain, Tree } from '@angular-devkit/schematics';
import {
  getNpmScope,
  getProjectConfig,
  normalizeSlashes,
  readJsonInTree,
  updateJsonInTree,
} from '@sinbix/utils';
import * as _ from 'lodash';
import { Dictionary } from 'lodash';
import { NormalizedOptions, ProjectRef } from './models';

export function updateImports(options: NormalizedOptions) {
  return (host: Tree) => {
    const project = getProjectConfig(host, options.projectName);

    if (project.projectType === 'application') {
      return;
    }

    const tsConfig = readJsonInTree(host, 'tsconfig.base.json');

    const c = tsConfig.compilerOptions;
    const paths: Dictionary<string[]> = c.paths || {};

    const fromPaths = _.keys(paths).filter((path) =>
      paths[path].some((x) => x.startsWith(project.root))
    );

    if (fromPaths.length) {
      const basePath = fromPaths
        .sort((a, b) => a.length - b.length)?.[0]
        .replace('/*', '');

      const addSeg = (fromPath: string) => {
        const seg = fromPath.replace(basePath, '');
        return seg !== fromPath ? seg ?? '' : '';
      };

      const projectRefs = fromPaths.map((fromPath) => ({
        from: fromPath,
        to: `${
          options.importPath ||
          normalizeSlashes(`@${getNpmScope(host)}/${options.destination}`)
        }${addSeg(fromPath)}`,
      }));

      return chain([
        updateFiles(options, projectRefs),
        updateTsConfig(options, projectRefs),
      ]);
    }
  };
}

function updateFiles(options: NormalizedOptions, projectRefs: ProjectRef[]) {
  return (host: Tree) => {
    if (options.updateImportPath) {
      for (const [name, definition] of _.entries<any>(
        readJsonInTree(host, 'angular.json').projects
      )) {
        if (name === options.projectName) {
          continue;
        }

        const projectDir = host.getDir(definition.root);
        projectDir.visit((file) => {
          const contents = host.read(file).toString('utf-8');

          projectRefs.forEach((projectRef) => {
            const replaceFrom = new RegExp(projectRef.from, 'g');
            if (!replaceFrom.test(contents)) {
              return;
            }

            host.overwrite(
              file,
              host
                .read(file)
                .toString()
                .replace(replaceFrom, projectRef.to.replace('*', ''))
            );
          });
        });
      }
    }
  };
}

function updateTsConfig(options: NormalizedOptions, projectRefs: ProjectRef[]) {
  return (host: Tree) => {
    return updateJsonInTree('tsconfig.base.json', (json) => {
      const c = json.compilerOptions;
      const paths: Dictionary<string[]> = c.paths || {};

      const project = getProjectConfig(host, options.projectName);

      const projectRoot = {
        from: project.root,
        to: options.destination,
      };

      projectRefs.forEach((projectRef) => {
        const path = paths[projectRef.from] as string[];

        const updatedPath = path.map((x) =>
          x.replace(new RegExp(projectRoot.from, 'g'), projectRoot.to)
        );

        if (options.updateImportPath) {
          delete paths[projectRef.from];
          paths[projectRef.to] = updatedPath;
        } else {
          paths[projectRef.from] = updatedPath;
        }
      });

      return json;
    });
  };
}
