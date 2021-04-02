export interface ProjectMoverSchematicOptions {
  projectName: string;
  destination: string;
  importPath?: string;
  updateImportPath: boolean;
}

export interface NormalizedOptions extends ProjectMoverSchematicOptions {}

export interface ProjectRef {
  from: string;
  to: string;
}
