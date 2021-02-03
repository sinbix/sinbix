import { NormalizedProjectOptions, ProjectType } from '../../../utils';

export interface ProjectSchematicOptions {
  name: string;
  directory?: string;
  type?: ProjectType;
  tags?: string;
  sourceRoot?: string;
  skipGitkeep: boolean;
}

export interface NormalizedOptions
  extends ProjectSchematicOptions,
    NormalizedProjectOptions {}
