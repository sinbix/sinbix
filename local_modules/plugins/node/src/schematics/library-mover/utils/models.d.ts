export interface LibraryMoverSchematicOptions {
    projectName: string;
    destination: string;
    importPath?: string;
    updateImportPath: boolean;
}
export interface NormalizedOptions extends LibraryMoverSchematicOptions {
}
