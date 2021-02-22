import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { ensureDirSync } from 'fs-extra';
import { tmpProjPath } from './paths';
import { cleanup } from './utils';
import {
  // EnsureSinbixProjectOptions,
  // NewSinbixProjectOptions,
  // PatchPackageJsonForPluginOptions,
  SinbixProjectOptions,
  RunPackageManagerInstallOptions,
  RunSinbixNewCommandOptions,
  ProjectDepsOptions,
} from '../types';
import { setDefaultValues } from '@sinbix-common/utils';
import { appRootPath } from '@sinbix/core/src/utils/app-root';
import { detectPackageManager } from '@sinbix/core/src/utils/detect-package-manager';
import { fileExists } from '@sinbix/core/src/utils/fileutils';
import * as path from 'path';
import { newSinbix, run } from '@sinbix/cli';
import { join } from 'path';

async function runSinbixNewCommand(options: RunSinbixNewCommandOptions) {
  const { project, args, silent } = options;
  const localTmpDir = join(process.cwd(), 'tmp/e2e');

  await newSinbix(localTmpDir, [
    project,
    '--no-interactive',
    '--skip-install',
    `--npmScope=${project}`,
  ]);

  // return execSync(
  //   `node sinbix g @sinbix/common:new ${project} --no-interactive --skip-install --npmScope=${project} ${
  //     args || ''
  //   }`,
  //   {
  //     cwd: localTmpDir,
  //     ...(silent && false ? { stdio: ['ignore', 'ignore', 'ignore'] } : {}),
  //   }
  // );

  // return execSync(
  //   `npx sinbix g @sinbix/common:new ${project} --no-interactive --skip-install --npmScope=${project} ${
  //     args || ''
  //   }`,
  //   {
  //     cwd: localTmpDir,
  //     ...(silent && false ? { stdio: ['ignore', 'ignore', 'ignore'] } : {}),
  //   }
  // );
}

// export function patchPackageJsonForPlugin(
//   options: PatchPackageJsonForPluginOptions
// ) {
//   const { npmPackageName, distPath, project } = options;
//   const opts = { project, path: 'package.json' };
//   const p = JSON.parse(readFileSync(tmpProjPath(opts)).toString());
//   p.devDependencies[npmPackageName] = `file:${appRootPath}/${distPath}`;
//   writeFileSync(tmpProjPath(opts), JSON.stringify(p, null, 2));
// }

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

  // execSync(`npx sinbix build ${project}`);

  await run(process.cwd(), [`${project}:build`], false);

  const opts = { project: projectId, path: 'package.json' };
  const p = JSON.parse(readFileSync(tmpProjPath(opts)).toString());
  p.devDependencies[npmPackageName] = `file:${rootPath(
    process.cwd()
  )}/${distPath}`;
  writeFileSync(tmpProjPath(opts), JSON.stringify(p, null, 2));
}

export async function newSinbixProject(
  projectId: string,
  options: SinbixProjectOptions
) {
  const { args, deps } = options;
  cleanup({ project: projectId });
  await runSinbixNewCommand({ args, silent: true, project: projectId });
  for (const dep of deps) {
    const { npmPackageName, distPath, project } = dep;
    await patchPackageJsonForPlugin(projectId, {
      npmPackageName,
      distPath,
      project,
    });
  }
  runPackageManagerInstall({ project: projectId });
}

export async function ensureSinbixProject(
  projectId: string,
  options: SinbixProjectOptions
) {
  ensureDirSync(tmpProjPath({ project: projectId }));
  await newSinbixProject(projectId, options);
}
