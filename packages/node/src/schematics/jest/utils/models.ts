import { NormalizedProjectConfigOptions } from '@sinbix/common';

export interface JestSchematicOptions {
  project: string;
  supportTsx?: boolean;
  setupFile?: 'angular' | 'none';
  skipSerializers?: boolean;
  testEnvironment?: 'node' | 'jsdom' | '';
}

export interface NormalizedOptions
  extends JestSchematicOptions,
    NormalizedProjectConfigOptions {}
