export { readTsConfig } from './utils/typescript';
export {
  toPropertyName,
  toClassName,
  toFileName,
  names,
  findModuleParent,
} from './utils/name-utils';
export { ProjectType, projectRootDir } from './utils/project-type';
export {
  serializeJson,
  renameSync,
  updateJsonFile,
  readJsonFile,
  readWorkspaceConfigPath,
  copyFile,
  createDirectory,
} from './utils/fileutils';
export {
  offsetFromRoot,
  ExistingPrettierConfig,
  resolveUserExistingPrettierConfig,
} from './utils/common';
export { output } from './utils/output';
export { commandsObject } from './command-line/nx-commands';
export { supportedNxCommands } from './command-line/supported-nx-commands';
export { readWorkspaceJson, readNxJson } from './core/file-utils';
export { NxJson } from './core/shared-interfaces';
export {
  ProjectGraphNode,
  ProjectGraphDependency,
  ProjectGraph,
} from './core/project-graph';
export { ProjectGraphCache } from './core/nx-deps/nx-deps-cache';
export {
  readJsonInTree,
  updateJsonInTree,
  updateWorkspaceInTree,
  insert,
  replaceNodeValue,
  addDepsToPackageJson,
  addMethod,
  addIncludeToTsConfig,
  addGlobal,
  getProjectConfig,
  addParameterToConstructor,
  createOrUpdate,
  findNodes,
  updatePackageJsonDependencies,
  getProjectGraphFromHost,
  readWorkspace,
  renameSyncInTree,
  renameDirSyncInTree,
  updateNxJsonInTree,
  addProjectToNxJsonInTree,
  readNxJsonInTree,
  InsertChange,
  ReplaceChange,
  RemoveChange,
} from './utils/ast-utils';

export {
  getNpmScope,
  getWorkspacePath,
  replaceAppNameWithPath,
  editTarget,
  parseTarget,
  serializeTarget,
} from './utils/cli-config-utils';

export {
  getWorkspace,
  updateWorkspace,
  updateBuilderConfig,
} from './utils/workspace';
export { addUpdateTask } from './utils/update-task';
export { addLintFiles, generateProjectLint, Linter } from './utils/lint';

export { addInstallTask } from './utils/rules/add-install-task';
export { formatFiles } from './utils/rules/format-files';
export { deleteFile } from './utils/rules/deleteFile';
export * from './utils/rules/ng-add';
export { updateKarmaConf } from './utils/rules/update-karma-conf';
export { visitNotIgnoredFiles } from './utils/rules/visit-not-ignored-files';
export { setDefaultCollection } from './utils/rules/workspace';
import * as strings from './utils/strings';
export { checkAndCleanWithSemver } from './utils/version-utils';
export { updatePackagesInPackageJson } from './utils/update-packages-in-package-json';

export const stringUtils = strings;
