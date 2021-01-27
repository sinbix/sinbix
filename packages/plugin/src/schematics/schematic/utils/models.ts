export interface SchematicSchematicOptions {
  project: string;
  name: string;
  description?: string;
  unitTestRunner: 'jest' | 'none';
}

export interface NormalizedOptions extends SchematicSchematicOptions {
  fileName: string;
  projectRoot: string;
  projectSourceRoot: string;
  npmScope: string;
  npmPackageName: string;
  fileTemplate: string;
}
