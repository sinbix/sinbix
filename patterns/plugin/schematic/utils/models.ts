import { NormalizedProjectOptions } from '@sinbix/common';

export interface PatternSchematicOptions {
  name: string;
  tags?: string;
  directory?: string;
}

export interface NormalizedOptions
  extends PatternSchematicOptions,
    NormalizedProjectOptions {}
