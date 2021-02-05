export interface PathOption {
  path?: string;
}

export interface ProjectOption {
  project?: string;
}

export interface TmpProjPathOptions extends PathOption, ProjectOption {
  project: string;
  path?: string;
}

export interface CopyNodeModulesOptions extends ProjectOption {
  project: string;
  modules: string[];
}

export interface UpdateFileOptions extends PathOption, ProjectOption {
  project: string;
  path: string;
  content: string | ((originalFileContent: string) => string);
}

export interface RenameFileOptions extends PathOption, ProjectOption {
  project: string;
  path: string;
  newPath: string;
}

export interface CheckFilesExistOptions extends ProjectOption {
  project: string;
  expectedPaths: string[];
}

export interface ListFilesOptions extends PathOption, ProjectOption {
  project: string;
  path?: string;
}

export interface ReadJsonOptions extends PathOption, ProjectOption {
  project: string;
  path: string;
}

export interface ReadFileOptions extends PathOption, ProjectOption {
  project: string;
  path: string;
}

export interface CleanupOptions extends ProjectOption {
  project: string;
}

export interface RmDistOptions extends ProjectOption {
  project: string;
}

export interface DirectoryExistsOptions extends PathOption {
  path: string;
}

export interface FileExistsOptions extends PathOption {
  path: string;
}

export interface ExistsOptions extends PathOption {
  path: string;
}

export interface GetSizeOptions extends PathOption {
  path: string;
}

export interface CommandOption {
  command?: string;
}

export interface SilenceErrorOption {
  silenceError?: boolean;
}

export interface RunCommandAsyncOptions
  extends CommandOption,
    ProjectOption,
    SilenceErrorOption {
  command: string;
  project: string;
  silenceError?: boolean;
}

export interface RunSinbixCommandAsyncOptions
  extends CommandOption,
    ProjectOption,
    SilenceErrorOption {
  command: string;
  project: string;
  silenceError?: boolean;
}

export interface RunSinbixCommandOptions
  extends CommandOption,
    ProjectOption,
    SilenceErrorOption {
  command: string;
  project: string;
  silenceError?: boolean;
}

export interface RunCommandOptions
  extends CommandOption,
    ProjectOption,
    SilenceErrorOption {
  command: string;
  project?: string;
}

export interface ArgsOption {
  args?: string;
}

export interface SilentOption {
  silent?: boolean;
}

export interface RunSinbixNewCommandOptions
  extends ArgsOption,
    SilentOption,
    ProjectOption {
  args?: string;
  silent?: boolean;
  project?: string;
}

export interface NpmPackageNameOption {
  npmPackageName?: string;
}

export interface DistPathOption {
  distPath?: string;
}

export interface PatchPackageJsonForPluginOptions
  extends NpmPackageNameOption,
    DistPathOption,
    ProjectOption {
  npmPackageName: string;
  distPath: string;
  project: string;
}

export interface RunPackageManagerInstallOptions
  extends ProjectOption,
    SilentOption {
  project: string;
  silent?: boolean;
}

export interface PluginDistPathOption {
  pluginDistPath?: string;
}

// export interface DepOptions {
//   project: string;
//   npmPackageName: string;
//   pluginDistPath: string;
// }
//
// export interface DepsOption {
//   deps?: DepOptions[];
// }

// export interface NewSinbixProjectOptions
//   extends NpmPackageNameOption,
//     PluginDistPathOption,
//     ArgsOption,
//     ProjectOption,
//     DepsOption {
//   npmPackageName: string;
//   pluginDistPath: string;
//   args?: string;
//   project?: string;
//   deps?: DepOptions[];
// }

// export interface EnsureSinbixProjectOptions
//   extends NpmPackageNameOption,
//     PluginDistPathOption,
//     ArgsOption,
//     ProjectOption,
//     DepsOption {
//   npmPackageName: string;
//   pluginDistPath: string;
//   args?: string;
//   project?: string;
//   deps?: DepOptions[];
// }

export interface ProjectDepsOptions {
  project: string;
  npmPackageName: string;
  distPath: string;
}

export interface SinbixProjectOptions {
  args?: string;
  deps: ProjectDepsOptions[];
}
