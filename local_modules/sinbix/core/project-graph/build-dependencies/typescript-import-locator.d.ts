import * as ts from 'typescript';
import { DependencyType } from '../project-graph-models';
import { FileRead } from '../../file-utils';
export declare class TypeScriptImportLocator {
    private readonly fileRead;
    private readonly scanner;
    constructor(fileRead: FileRead);
    fromFile(filePath: string, visitor: (importExpr: string, filePath: string, type: DependencyType) => void): void;
    fromNode(filePath: string, node: ts.Node, visitor: (importExpr: string, filePath: string, type: DependencyType) => void): void;
    private getPropertyAssignmentName;
    private getStringLiteralValue;
}
