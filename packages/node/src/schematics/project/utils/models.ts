import { NormalizedProjectOptions, ProjectType } from '@sinbix/common';

export interface ProjectSchematicOptions {
  name: string;
  tags?: string;
  type?: ProjectType;
  sourceRoot?: string;
  testEnvironment?: 'node' | 'jsdom' | '';
}

export interface NormalizedOptions
  extends ProjectSchematicOptions,
    NormalizedProjectOptions {}
