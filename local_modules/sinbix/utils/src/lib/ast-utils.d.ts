/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT- style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Rule, SchematicContext, Source, Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';
import { ProjectGraph } from '@sinbix/core/project-graph';
import { FileData } from '@sinbix/core/file-utils';
import { SinbixJson, SinbixJsonProjectConfig } from '@sinbix/core/shared-interfaces';
import { Path } from '@angular-devkit/core';
export declare function sortObjectByKeys(obj: unknown): {};
export declare function findNodes(node: ts.Node, kind: ts.SyntaxKind | ts.SyntaxKind[], max?: number): ts.Node[];
export declare function getSourceNodes(sourceFile: ts.SourceFile): ts.Node[];
export interface Change {
    apply(host: any): Promise<void>;
    readonly type: string;
    readonly path: string | null;
    readonly order: number;
    readonly description: string;
}
export declare class NoopChange implements Change {
    type: string;
    description: string;
    order: number;
    path: any;
    apply(): Promise<void>;
}
export declare class InsertChange implements Change {
    path: string;
    pos: number;
    toAdd: string;
    type: string;
    order: number;
    description: string;
    constructor(path: string, pos: number, toAdd: string);
    apply(host: any): any;
}
export declare class RemoveChange implements Change {
    path: string;
    pos: number;
    toRemove: string;
    type: string;
    order: number;
    description: string;
    constructor(path: string, pos: number, toRemove: string);
    apply(host: any): Promise<void>;
}
export declare class ReplaceChange implements Change {
    path: string;
    pos: number;
    oldText: string;
    newText: string;
    type: string;
    order: number;
    description: string;
    constructor(path: string, pos: number, oldText: string, newText: string);
    apply(host: any): Promise<void>;
}
export declare function addParameterToConstructor(source: ts.SourceFile, modulePath: string, opts: {
    className: string;
    param: string;
}): Change[];
export declare function addMethod(source: ts.SourceFile, modulePath: string, opts: {
    className: string;
    methodHeader: string;
    body: string;
}): Change[];
export declare function findClass(source: ts.SourceFile, className: string, silent?: boolean): ts.ClassDeclaration;
export declare function offset(text: string, numberOfTabs: number, wrap: boolean): string;
export declare function addIncludeToTsConfig(tsConfigPath: string, source: ts.SourceFile, include: string): Change[];
export declare function getImport(source: ts.SourceFile, predicate: (a: any) => boolean): {
    moduleSpec: string;
    bindings: string[];
}[];
export declare function addGlobal(source: ts.SourceFile, modulePath: string, statement: string): Change[];
export declare function insert(host: Tree, modulePath: string, changes: Change[]): void;
/**
 * This method is specifically for reading JSON files in a Tree
 * @param host The host tree
 * @param path The path to the JSON file
 * @returns The JSON data in the file.
 */
export declare function readJsonInTree<T = any>(host: Tree, path: string): T;
/**
 * Method for utilizing the project graph in schematics
 */
export declare function getProjectGraphFromHost(host: Tree): ProjectGraph;
export declare function getFullProjectGraphFromHost(host: Tree): ProjectGraph;
export declare function getFileDataInHost(host: Tree, path: Path): FileData;
export declare function allFilesInDirInHost(host: Tree, path: Path, options?: {
    recursive: boolean;
}): Path[];
/**
 * This method is specifically for updating JSON in a Tree
 * @param path Path of JSON file in the Tree
 * @param callback Manipulation of the JSON data
 * @returns A rule which updates a JSON file file in a Tree
 */
export declare function updateJsonInTree<T = any, O = T>(path: string, callback: (json: T, context: SchematicContext) => O): Rule;
export declare function updateWorkspaceInTree<T = any, O = T>(callback: (json: T, context: SchematicContext, host: Tree) => O): Rule;
export declare function readSinbixJsonInTree(host: Tree): SinbixJson<string[] | "*">;
export declare function libsDir(host: Tree): string;
export declare function appsDir(host: Tree): string;
export declare function updateSinbixJsonInTree(callback: (json: SinbixJson, context: SchematicContext) => SinbixJson): Rule;
export declare function addProjectToSinbixJsonInTree(projectName: string, options: SinbixJsonProjectConfig): Rule;
export declare function readWorkspace(host: Tree): any;
/**
 * Updates the package.json given the passed deps and/or devDeps. Only updates
 * if the packages are not yet present
 *
 * @param host the schematic tree
 * @param deps the package.json dependencies to add
 * @param devDeps the package.json devDependencies to add
 * @param addInstall default `true`; set to false to avoid installs
 */
export declare function addDepsToPackageJson(deps: any, devDeps: any, addInstall?: boolean): Rule;
export declare function updatePackageJsonDependencies(deps: any, devDeps: any, addInstall?: boolean): Rule;
export declare function getProjectConfig(host: Tree, name: string): any;
export declare function createOrUpdate(host: Tree, path: string, content: string): void;
export declare function insertImport(source: ts.SourceFile, fileToEdit: string, symbolName: string, fileName: string, isDefault?: boolean): Change;
export declare function replaceNodeValue(host: Tree, modulePath: string, node: ts.Node, content: string): void;
export declare function renameSyncInTree(tree: Tree, from: string, to: string, cb: (err: string) => void): void;
export declare function renameDirSyncInTree(tree: Tree, from: string, to: string, cb: (err: string) => void): void;
/**
 * Applies a template merge but skips for already existing entries
 */
export declare function applyWithSkipExisting(source: Source, rules: Rule[]): Rule;
