import { appRootPath } from '@nrwl/workspace/src/utils/app-root';
import { detectPackageManager } from '@nrwl/workspace/src/utils/detect-package-manager';
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { ensureDirSync } from 'fs-extra';
import { tmpProjPath } from './paths';
import { cleanup } from './utils';

function runSinbixNewCommand(args?: string, silent?: boolean) {
  const localTmpDir = `./tmp/sinbix-e2e`;
  return execSync(
    `node ${require.resolve(
      '@sinbix/cli'
    )} new proj --no-interactive --skip-install --collection=@nrwl/workspace --npmScope=proj --preset=empty ${
      args || ''
    }`,
    {
      cwd: localTmpDir,
      // eslint-disable-next-line no-constant-condition
      ...(silent && false ? { stdio: ['ignore', 'ignore', 'ignore'] } : {}),
    }
  );
}

export function patchPackageJsonForPlugin(
  npmPackageName: string,
  distPath: string
) {
  const p = JSON.parse(readFileSync(tmpProjPath('package.json')).toString());
  p.devDependencies[npmPackageName] = `file:${appRootPath}/${distPath}`;
  writeFileSync(tmpProjPath('package.json'), JSON.stringify(p, null, 2));
}

/**
 * Generate a unique name for running CLI commands
 * @param prefix
 *
 * @returns `'<prefix><random number>'`
 */
export function uniq(prefix: string) {
  return `${prefix}${Math.floor(Math.random() * 10000000)}`;
}

/**
 * Run the appropriate package manager install command in the e2e directory
 * @param silent silent output from the install
 */
export function runPackageManagerInstall(silent: boolean = true) {
  const packageManager = detectPackageManager();
  const install = execSync(`${packageManager} install`, {
    cwd: tmpProjPath(),
    ...(silent ? { stdio: ['ignore', 'ignore', 'ignore'] } : {}),
  });
  return install ? install.toString() : '';
}

/**
 * Creates a new sinbix project in the e2e directory
 *
 * @param npmPackageName package name to test
 * @param pluginDistPath dist path where the plugin was outputted to
 * @param args set arguments for sinbix project
 */
export function newSinbixProject(
  npmPackageName: string,
  pluginDistPath: string,
  args?: string
): void {
  cleanup();
  runSinbixNewCommand(args, true);
  patchPackageJsonForPlugin(npmPackageName, pluginDistPath);
  runPackageManagerInstall();
}

/**
 * Ensures that a project has been setup in the e2e directory
 * It will also copy `@nrwl` packages to the e2e directory
 */
export function ensureSinbixProject(
  npmPackageName?: string,
  pluginDistPath?: string,
  args?: string
): void {
  ensureDirSync(tmpProjPath());
  newSinbixProject(npmPackageName, pluginDistPath, args);
}
