import { ProjectMoverSchematicOptions } from './models';
export declare function normalizeOptions(options: ProjectMoverSchematicOptions): {
    projectName: string;
    destination: string;
    importPath?: string;
    updateImportPath: boolean;
};
