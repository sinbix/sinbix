import { HostTree } from '@angular-devkit/schematics';
import { BuilderContext } from '@angular-devkit/architect';
export declare function createHost(workspaceRoot: string): HostTree;
export declare function createBuilderHost(context: BuilderContext): HostTree;
export declare function getBuilderProjectData(context: BuilderContext): {
    [k: string]: any;
    architect?: {
        [k: string]: any;
    };
    files: import("../../../../../dist/packages/sinbix/core/src/file-utils").FileData[];
};
