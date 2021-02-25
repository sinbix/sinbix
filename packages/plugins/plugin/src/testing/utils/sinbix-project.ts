import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { ensureDirSync } from 'fs-extra';
import { tmpProjPath } from './paths';
import { cleanup } from './utils';
import {
  RunPackageManagerInstallOptions,
  ProjectDepsOptions,
} from '../types';
import { setDefaultValues } from '@sinbix-common/utils';
import { detectPackageManager } from '@sinbix/core/src/utils/detect-package-manager';
import { fileExists } from '@sinbix/core/src/utils/fileutils';
import * as path from 'path';
import { run, newCommand  } from '@sinbix/cli';
import { join } from 'path';

async function runSinbixNewCommand(project: string, silent = true, args: string) {
  const localTmpDir = join(process.cwd(), 'tmp/e2e');

  await newCommand(localTmpDir, [
    project,
    '--no-interactive',
    '--skip-install',
    `--npmScope=${project}`,
    ...(args || '').split(' ')
  ], {
    silent
  });
}

export function uniq(prefix: string) {
  return `${prefix}${Math.floor(Math.random() * 10000000)}`;
}

export function runPackageManagerInstall(
  options: RunPackageManagerInstallOptions
) {
  options = setDefaultValues(options, {
    silent: true,
  });

  const { project, silent } = options;
  const packageManager = detectPackageManager();
  const install = execSync(`${packageManager} install`, {
    cwd: tmpProjPath({ project }),
    ...(silent ? { stdio: ['ignore', 'ignore', 'ignore'] } : {}),
  });
  return install ? install.toString() : '';
}

function rootPath(dir: string) {
  if (fileExists(path.join(dir, 'angular.json'))) {
    return dir;
  } else {
    return rootPath(path.dirname(dir));
  }
}
export async function patchPackageJsonForPlugin(
  projectId: string,
  options: ProjectDepsOptions
) {
  const { npmPackageName, distPath, project } = options;

  await run(process.cwd(), [`${project}:build`], false);

  const opts = { project: projectId, path: 'package.json' };
  const p = JSON.parse(readFileSync(tmpProjPath(opts)).toString());
  p.devDependencies[npmPackageName] = `file:${rootPath(
    process.cwd()
  )}/${distPath}`;
  writeFileSync(tmpProjPath(opts), JSON.stringify(p, null, 2));
}

export async function newSinbixProject(
  project: string,
  deps: ProjectDepsOptions[],
  silent = true,
  args?: string,
) {
  cleanup({ project });
  await runSinbixNewCommand(project, silent, args);
  for (const dep of deps) {
    const { npmPackageName, distPath, project } = dep;
    await patchPackageJsonForPlugin(project, {
      npmPackageName,
      distPath,
      project,
    });
  }
  runPackageManagerInstall({ project });
}

export async function ensureSinbixProject(
  project: string,
  deps: ProjectDepsOptions[],
  silent = true,
  args?: string
) {
  ensureDirSync(tmpProjPath({ project }));
  await newSinbixProject(project, deps, silent, args);
}
