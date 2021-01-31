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
import { setDefaultValues } from '@sinbix/common';
import { appRootPath } from '@sinbix/core/src/utils/app-root';
import { detectPackageManager } from '@sinbix/core/src/utils/detect-package-manager';

function runSinbixNewCommand(options: RunSinbixNewCommandOptions) {
  const { project, args, silent } = options;
  const localTmpDir = `./tmp/e2e`;

  return execSync(
    `npx sinbix g @sinbix/common:new ${project} --no-interactive --skip-install --npmScope=${project} ${
      args || ''
    }`,
    {
      cwd: localTmpDir,
      ...(silent && false ? { stdio: ['ignore', 'ignore', 'ignore'] } : {}),
    }
  );
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
  const install = execSync(`${packageManager} install --dev`, {
    cwd: tmpProjPath({ project }),
    ...(silent ? { stdio: ['ignore', 'ignore', 'ignore'] } : {}),
  });
  return install ? install.toString() : '';
}

// export function newSinbixProject(options: NewSinbixProjectOptions): void {
//   const { npmPackageName, pluginDistPath, args, project } = options;
//   cleanup({ project });
//   runSinbixNewCommand({ args, silent: true, project });
//   patchPackageJsonForPlugin({
//     npmPackageName,
//     distPath: pluginDistPath,
//     project,
//   });
//   for (const dep of options.deps) {
//     patchPackageJsonForPlugin({
//       npmPackageName: dep.npmPackageName,
//       distPath: dep.pluginDistPath,
//       project,
//     });
//   }
//   runPackageManagerInstall({ project });
// }

// export function ensureSinbixProject(options: EnsureSinbixProjectOptions): void {
//   const { project } = options;
//   ensureDirSync(tmpProjPath({ project }));
//   newSinbixProject(options);
// }

export function patchPackageJsonForPlugin(
  projectId: string,
  options: ProjectDepsOptions
) {
  const { npmPackageName, distPath, project } = options;

  execSync(`npx sinbix build ${project}`);

  const opts = { project: projectId, path: 'package.json' };
  const p = JSON.parse(readFileSync(tmpProjPath(opts)).toString());
  p.devDependencies[npmPackageName] = `file:${appRootPath}/${distPath}`;
  writeFileSync(tmpProjPath(opts), JSON.stringify(p, null, 2));
}

export function newSinbixProject(
  projectId: string,
  options: SinbixProjectOptions
): void {
  const { args, deps } = options;
  cleanup({ project: projectId });
  runSinbixNewCommand({ args, silent: true, project: projectId });
  for (const dep of deps) {
    const { npmPackageName, distPath, project } = dep;
    patchPackageJsonForPlugin(projectId, {
      npmPackageName,
      distPath,
      project,
    });
  }
  runPackageManagerInstall({ project: projectId });
}

export function ensureSinbixProject(
  projectId: string,
  options: SinbixProjectOptions
): void {
  ensureDirSync(tmpProjPath({ project: projectId }));
  newSinbixProject(projectId, options);
}
