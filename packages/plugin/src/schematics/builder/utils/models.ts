export interface BuilderSchematicOptions {
  project: string;
  name: string;
  description?: string;
  unitTestRunner: 'jest' | 'none';
}

export interface NormalizedOptions extends BuilderSchematicOptions {
  fileName: string;
  projectRoot: string;
  projectSourceRoot: string;
  npmScope: string;
}
