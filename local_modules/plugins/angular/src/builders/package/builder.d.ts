import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import { Observable } from 'rxjs';
import { DependentBuildableProjectNode } from '@sinbix/core/plugin-utils';
import { PackageBuilderOptions } from './utils';
import { JsonObject } from '@angular-devkit/core';
export declare function runBuilder(initializeNgPackagr: (options: PackageBuilderOptions & JsonObject, context: BuilderContext, projectDependencies: DependentBuildableProjectNode[]) => Promise<import('ng-packagr').NgPackagr>): (options: PackageBuilderOptions & JsonObject, context: BuilderContext) => Observable<BuilderOutput>;
declare const _default: import("@angular-devkit/architect/src/internal").Builder<any>;
export default _default;
