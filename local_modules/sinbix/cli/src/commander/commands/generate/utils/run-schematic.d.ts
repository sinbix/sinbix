import { FileSystemCollectionDescription, FileSystemSchematicDescription, NodeWorkflow } from '@angular-devkit/schematics/tools';
import { logging } from '@angular-devkit/core';
import { Schematic } from '@angular-devkit/schematics';
import { GenerateOptions } from './models';
export declare function runSchematic(root: string, workflow: NodeWorkflow, logger: logging.Logger, opts: GenerateOptions, schematic: Schematic<FileSystemCollectionDescription, FileSystemSchematicDescription>, allowAdditionalArgs?: boolean): Promise<number>;
