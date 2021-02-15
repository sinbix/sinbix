export { readTsConfig } from './utils/typescript';
export {
  serializeJson,
  renameSync,
  updateJsonFile,
  readJsonFile,
  readWorkspaceConfigPath,
  copyFile,
  createDirectory,
} from './utils/fileutils';

export { output } from './utils/output';
export { commandsObject } from './command-line/nx-commands';
export { supportedNxCommands } from './command-line/supported-nx-commands';
export { readWorkspaceJson, readSinbixJson } from './file-utils';
export { SinbixJson } from './shared-interfaces';
export {
  ProjectGraphNode,
  ProjectGraphDependency,
  ProjectGraph,
} from './project-graph';
export { ProjectGraphCache } from './nx-deps/nx-deps-cache';

export { checkAndCleanWithSemver } from './utils/version-utils';

