import { LibraryMoverSchematicOptions } from './models';
export declare function normalizeOptions(options: LibraryMoverSchematicOptions): {
    projectName: string;
    destination: string;
    importPath?: string;
    updateImportPath: boolean;
};
