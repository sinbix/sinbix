import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { ensureDirSync } from 'fs-extra';
import { setDefaultValues } from '@sinbix-common/utils';
import { detectPackageManager } from '@sinbix/core/src/utils/detect-package-manager';
import { fileExists } from '@sinbix/core/src/utils/fileutils';
import { runCommand, newCommand, LoggerFlags } from '@sinbix/cli';
import { dirname, join } from 'path';
import { tmpProjPath } from './paths';
import { cleanup } from './utils';
import { RunPackageManagerInstallOptions, ProjectDepsOptions } from '../types';

async function runSinbixNewCommand(
  project: string,
  args?: string,
  silent = false,
) {
  const localTmpDir = 'tmp/e2e';

  return execSync(
    `npx sinbix new ${project} --no-interactive --skip-install --npmScope=${project} ${
      args || ''
    }`,
    {
      cwd: localTmpDir,
      ...(silent && false ? { stdio: ['ignore', 'ignore', 'ignore'] } : {}),
    }
  );
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
  if (fileExists(join(dir, 'angular.json'))) {
    return dir;
  } else {
    return rootPath(dirname(dir));
  }
}

export async function patchPackageJsonForPlugin(
  projectId: string,
  options: ProjectDepsOptions
) {
  const { npmPackageName, distPath, projectName: project } = options;

  execSync(`npx sinbix build ${project}`);

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
  args?: string,
  silent = false
) {
  cleanup({ project });
  await runSinbixNewCommand(project, args, silent);
  for (const dep of deps) {
    const { npmPackageName, distPath, projectName } = dep;
    await patchPackageJsonForPlugin(project, {
      npmPackageName,
      distPath,
      projectName,
    });
  }
  runPackageManagerInstall({ project });
}

export async function ensureSinbixProject(
  project: string,
  deps: ProjectDepsOptions[],
  args?: string,
  silent = false
) {
  ensureDirSync(tmpProjPath({ project }));
  await newSinbixProject(project, deps, args, silent);
}
