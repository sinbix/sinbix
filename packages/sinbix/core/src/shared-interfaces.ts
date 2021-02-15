import { WorkspaceResults } from "./command-line/workspace-results";

export type ImplicitDependencyEntry<T = '*' | string[]> = {
  [key: string]: T | ImplicitJsonSubsetDependency<T>;
};

export interface ImplicitJsonSubsetDependency<T = '*' | string[]> {
  [key: string]: T | ImplicitJsonSubsetDependency<T>;
}

export interface SinbixAffectedConfig {
  defaultBase?: string;
}

export interface SinbixJson<T = '*' | string[]> {
  implicitDependencies?: ImplicitDependencyEntry<T>;
  npmScope: string;
  affected?: SinbixAffectedConfig;
  projects: {
    [projectName: string]: SinbixJsonProjectConfig;
  };
  workspaceLayout?: {
    libsDir?: string;
    appsDir?: string;
  };
  tasksRunnerOptions?: {
    [tasksRunnerName: string]: {
      runner: string;
      options?: object;
    };
  };
}

export interface SinbixJsonProjectConfig {
  implicitDependencies?: string[];
  tags?: string[];
}

export interface Environment {
  sinbixJson: SinbixJson;
  workspaceJson: any;
  workspaceResults: WorkspaceResults;
}
