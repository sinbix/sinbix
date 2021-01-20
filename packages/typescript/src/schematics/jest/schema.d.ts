export interface JestSchematicSchema {
  project: string;
  supportTsx?: boolean;
  setupFile?: 'angular' | 'none';
  skipSerializers?: boolean;
  testEnvironment?: 'node' | 'jsdom' | '';
}
