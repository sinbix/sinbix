import { NormalizedProjectConfigOptions } from '@sinbix/utils';

export interface JestSchematicOptions {
  project: string;
  supportTsx?: boolean;
  setupFile?: 'angular' | 'none';
  skipSerializers?: boolean;
  testEnvironment?: 'node' | 'jsdom' | '';
  testTimeout: number;
}

export interface NormalizedOptions
  extends JestSchematicOptions,
    NormalizedProjectConfigOptions {}
