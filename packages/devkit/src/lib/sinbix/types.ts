import { Dictionary } from '@sinbix/common';

export interface SinbixProjectType {
  src: string;
}

export interface SinbixProject {
  name: string;
  type: SinbixProjectType;
  src: string;
}

export interface Sinbix {
  projectTypes: Dictionary<SinbixProjectType>;
  projects: Dictionary<SinbixProject>;
}
