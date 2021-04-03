import { ProjectMoverSchematicOptions } from './models';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';
export declare function normalizeOptions(host: Tree, options: ProjectMoverSchematicOptions): {
    projectName: string;
    destination: string;
    importPath?: string;
    updateImportPath: boolean;
};
