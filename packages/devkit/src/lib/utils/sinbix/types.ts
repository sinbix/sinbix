import { Dictionary } from '@sinbix/common';
import { NxJsonProjectConfig } from '@nrwl/workspace/src/core/shared-interfaces';

export interface SinbixProjectType {
  directory: string;
  type: string;
}

export interface SinbixProject {
  type: string;
}

export interface SinbixJson {
  projectTypes: Dictionary<SinbixProjectType>;
  projects: Dictionary<SinbixProject>;
}

export interface SinbixJsonProjectConfig
  extends NxJsonProjectConfig,
    SinbixProject {}
