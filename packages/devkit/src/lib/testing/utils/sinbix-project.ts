import { appRootPath } from '@nrwl/workspace/src/utils/app-root';
import { detectPackageManager } from '@nrwl/workspace/src/utils/detect-package-manager';
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { ensureDirSync } from 'fs-extra';
import { tmpProjPath } from './paths';
import { cleanup } from './utils';

function runSinbixNewCommand(args?: string, silent?: boolean, projectName?: string) {
  const localTmpDir = `./tmp/sinbix-e2e`;
  const proj = projectName ?? 'proj';
  return execSync(
    `node ${require.resolve(
      '@sinbix/cli'
    )} new ${proj} --no-interactive --skip-install --collection=@sinbix/devkit --npmScope=${proj} ${
      args || ''
    }`,
    {
      cwd: localTmpDir,
      ...(silent && false ? { stdio: ['ignore', 'ignore', 'ignore'] } : {}),
    }
  );
}

export function patchPackageJsonForPlugin(
  npmPackageName: string,
  distPath: string,
  projectName: string
) {
  const p = JSON.parse(readFileSync(tmpProjPath(projectName, 'package.json')).toString());
  p.devDependencies[npmPackageName] = `file:${appRootPath}/${distPath}`;
  writeFileSync(tmpProjPath(projectName,'package.json'), JSON.stringify(p, null, 2));
}

export function uniq(prefix: string) {
  return `${prefix}${Math.floor(Math.random() * 10000000)}`;
}

export function runPackageManagerInstall(projectName: string, silent = true) {
  const packageManager = detectPackageManager();
  const install = execSync(`${packageManager} install`, {
    cwd: tmpProjPath(projectName),
    ...(silent ? { stdio: ['ignore', 'ignore', 'ignore'] } : {}),
  });
  return install ? install.toString() : '';
}

export function newSinbixProject(
  npmPackageName: string,
  pluginDistPath: string,
  args?: string,
  projectName?: string
): void {
  cleanup(projectName);
  runSinbixNewCommand(args, true, projectName);
  patchPackageJsonForPlugin(npmPackageName, pluginDistPath, projectName);
  runPackageManagerInstall(projectName);
}

export function ensureSinbixProject(
  npmPackageName?: string,
  pluginDistPath?: string,
  args?: string,
  projectName?: string,
): void {
  ensureDirSync(tmpProjPath(projectName));
  newSinbixProject(npmPackageName, pluginDistPath, args, projectName);
}
