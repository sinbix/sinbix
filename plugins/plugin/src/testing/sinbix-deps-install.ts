import { detectPackageManager } from '@sinbix/core/src/utils/detect-package-manager';
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileExists } from './common';
import { ProjectDependecy } from './models';
import { tmpProjPath } from './paths';

export function sinbixDepsInstall(
  project: string,
  deps: ProjectDependecy[],
  silent = true
) {
  for (const dep of deps) {
    patchPackageJsonForPlugin(project, dep);
  }
  runPackageManagerInstall(project, silent);
}

function patchPackageJsonForPlugin(project: string, dep: ProjectDependecy) {
  const { npmPackageName, distPath, projectName } = dep;

  execSync(`npx sinbix build ${projectName}`);

  const p = JSON.parse(
    readFileSync(tmpProjPath(project, 'package.json')).toString()
  );

  const depPath = `${rootPath(process.cwd())}/${distPath}`;

  p.devDependencies[npmPackageName] = `file:${depPath}`;

  execSync(`npm i --prefix ${depPath}  --no-package-lock`);

  writeFileSync(
    tmpProjPath(project, 'package.json'),
    JSON.stringify(p, null, 2)
  );
}

function rootPath(dir: string) {
  if (fileExists(join(dir, 'angular.json'))) {
    return dir;
  } else {
    return rootPath(dirname(dir));
  }
}

function runPackageManagerInstall(project: string, silent = true) {
  const packageManager = detectPackageManager();
  const install = execSync(`${packageManager} install`, {
    cwd: tmpProjPath(project),
    ...(silent ? { stdio: ['ignore', 'ignore', 'ignore'] } : {}),
  });
  return install ? install.toString() : '';
}
