import { chain, noop } from '@angular-devkit/schematics';
import { readFileSync } from 'fs';
import { lt } from 'semver';

import { checkAndCleanWithSemver } from '@sinbix/core/utils/version-utils';

import { updateJsonInTree } from './ast-utils';
import { addInstallTask } from './rules';

export function updatePackagesInPackageJson(
  migrationFilePath: string,
  versionName: string,
  options: { skipInstall: boolean } = { skipInstall: false }
) {
  const migrations = JSON.parse(readFileSync(migrationFilePath).toString());
  const packageJsonUpdates = migrations.packageJsonUpdates[versionName];

  // should never happen
  if (!packageJsonUpdates) {
    throw new Error(`Cannot find ${versionName} in migrations.json`);
  }

  const updatedPackages = packageJsonUpdates.packages;
  let needsInstall = false;
  return chain([
    updateJsonInTree('package.json', (json) => {
      Object.keys(updatedPackages).forEach((p) => {
        /**
         * Check the updated version against semver
         */
        const cleanUpdatedVersion = checkAndCleanWithSemver(
          p,
          updatedPackages[p].version
        );

        if (json.devDependencies && json.devDependencies[p]) {
          const cleanDevVersion = checkAndCleanWithSemver(
            p,
            json.devDependencies[p]
          );

          if (lt(cleanDevVersion, cleanUpdatedVersion)) {
            json.devDependencies[p] = updatedPackages[p].version;
            needsInstall = true;
          }
        } else if (json.dependencies && json.dependencies[p]) {
          const cleanVersion = checkAndCleanWithSemver(p, json.dependencies[p]);

          if (lt(cleanVersion, cleanUpdatedVersion)) {
            json.dependencies[p] = updatedPackages[p].version;
            needsInstall = true;
          }
        } else if (updatedPackages[p].alwaysAddToPackageJson) {
          const cleanVersion = checkAndCleanWithSemver(p, json.dependencies[p]);

          if (lt(cleanVersion, cleanUpdatedVersion)) {
            if (!json.dependencies) json.dependencies = {};
            json.dependencies[p] = updatedPackages[p].version;
            needsInstall = true;
          }
        }
      });
      return json;
    }),
    needsInstall ? addInstallTask(options) : noop(),
  ]);
}
