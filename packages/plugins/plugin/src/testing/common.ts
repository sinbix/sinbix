import {
  copySync,
  ensureDirSync,
  readdirSync,
  readFileSync,
  removeSync,
  renameSync,
  statSync,
  writeFileSync,
} from 'fs-extra';
import { dirname } from 'path';
import { tmpProjPath } from './paths';

export function copyNodeModules(project: string, modules: string[]) {
  modules.forEach((module) => {
    removeSync(`${tmpProjPath(project)}/node_modules/${module}`);
    copySync(
      `./node_modules/${module}`,
      `${tmpProjPath(project)}/node_modules/${module}`
    );
  });
}

export function updateFile(
  project: string,
  path: string,
  content: string | ((originalFileContent: string) => string)
): void {
  ensureDirSync(dirname(tmpProjPath(project, path)));
  if (typeof content === 'string') {
    writeFileSync(tmpProjPath(project, path), content);
  } else {
    writeFileSync(
      tmpProjPath(project, path),
      content(readFileSync(tmpProjPath(project, path)).toString())
    );
  }
}

export function renameFile(
  project: string,
  path: string,
  newPath: string
): void {
  ensureDirSync(dirname(tmpProjPath(project, newPath)));
  renameSync(tmpProjPath(project, path), tmpProjPath(project, newPath));
}

export function checkFilesExist(project: string, expectedPaths: string[]) {
  expectedPaths.forEach((path) => {
    const opts = { project, path };
    const filePath = tmpProjPath(project, path);
    if (!exists(filePath)) {
      throw new Error(`'${filePath}' does not exist`);
    }
  });
}

export function listFiles(project: string, path?: string) {
  return readdirSync(tmpProjPath(project, path));
}

export function readJson(project: string, path: string): any {
  return JSON.parse(readFile(project, path));
}

export function readFile(project: string, path: string) {
  const filePath = tmpProjPath(project, path);
  return readFileSync(filePath).toString();
}

export function cleanup(project: string) {
  removeSync(tmpProjPath(project));
}

export function rmDist(project: string) {
  removeSync(`${tmpProjPath(project)}/dist`);
}

export function getCwd(): string {
  return process.cwd();
}

export function directoryExists(path: string): boolean {
  try {
    return statSync(path).isDirectory();
  } catch (err) {
    return false;
  }
}

export function fileExists(path: string): boolean {
  try {
    return statSync(path).isFile();
  } catch (err) {
    return false;
  }
}

export function exists(path: string): boolean {
  return directoryExists(path) || fileExists(path);
}

export function getSize(path: string): number {
  return statSync(path).size;
}

export function uniq(prefix: string) {
  return `${prefix}${Math.floor(Math.random() * 10000000)}`;
}
