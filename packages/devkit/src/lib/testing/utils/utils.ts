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
import {
  CheckFilesExistOptions,
  CleanupOptions,
  CopyNodeModulesOptions,
  DirectoryExistsOptions,
  ExistsOptions,
  FileExistsOptions,
  GetSizeOptions,
  ListFilesOptions,
  ReadFileOptions,
  ReadJsonOptions,
  RenameFileOptions,
  RmDistOptions,
  UpdateFileOptions,
} from '../types';

export function copyNodeModules(options: CopyNodeModulesOptions) {
  const { project, modules } = options;
  const opts = { project };
  modules.forEach((module) => {
    removeSync(`${tmpProjPath(opts)}/node_modules/${module}`);
    copySync(
      `./node_modules/${module}`,
      `${tmpProjPath(opts)}/node_modules/${module}`
    );
  });
}

export function updateFile(options: UpdateFileOptions): void {
  const { path, project, content } = options;
  const opts = { path, project };
  ensureDirSync(dirname(tmpProjPath(opts)));
  if (typeof content === 'string') {
    writeFileSync(tmpProjPath(opts), content);
  } else {
    writeFileSync(
      tmpProjPath(opts),
      content(readFileSync(tmpProjPath(opts)).toString())
    );
  }
}

export function renameFile(options: RenameFileOptions): void {
  const { project, path, newPath } = options;
  const opts = { project, path };
  const newOpts = { project, newPath };
  ensureDirSync(dirname(tmpProjPath(newOpts)));
  renameSync(tmpProjPath(opts), tmpProjPath(newOpts));
}

export function checkFilesExist(options: CheckFilesExistOptions) {
  const { project, expectedPaths } = options;
  expectedPaths.forEach((path) => {
    const opts = { project, path };
    const filePath = tmpProjPath(opts);
    const existsOpts = { path: filePath };
    if (!exists(existsOpts)) {
      throw new Error(`'${filePath}' does not exist`);
    }
  });
}

export function listFiles(options: ListFilesOptions) {
  return readdirSync(tmpProjPath(options));
}

export function readJson(options: ReadJsonOptions): any {
  return JSON.parse(readFile(options));
}

export function readFile(options: ReadFileOptions) {
  const filePath = tmpProjPath(options);
  return readFileSync(filePath).toString();
}

export function cleanup(options: CleanupOptions) {
  removeSync(tmpProjPath(options));
}

export function rmDist(options: RmDistOptions) {
  removeSync(`${tmpProjPath(options)}/dist`);
}

export function getCwd(): string {
  return process.cwd();
}

export function directoryExists(options: DirectoryExistsOptions): boolean {
  const { path } = options;
  try {
    return statSync(path).isDirectory();
  } catch (err) {
    return false;
  }
}

export function fileExists(options: FileExistsOptions): boolean {
  const { path } = options;
  try {
    return statSync(path).isFile();
  } catch (err) {
    return false;
  }
}

export function exists(options: ExistsOptions): boolean {
  return directoryExists(options) || fileExists(options);
}

export function getSize(options: GetSizeOptions): number {
  const { path } = options;
  return statSync(path).size;
}
