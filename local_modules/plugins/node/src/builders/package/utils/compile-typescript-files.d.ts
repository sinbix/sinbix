import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import { NormalizedBuilderOptions } from './models';
import { Observable } from 'rxjs';
import { DependentBuildableProjectNode } from '@sinbix/utils';
export declare function compileTypeScriptFiles(options: NormalizedBuilderOptions, context: BuilderContext, libRoot: string, projectDependencies: DependentBuildableProjectNode[]): Observable<BuilderOutput>;
