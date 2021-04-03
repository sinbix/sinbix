/// <reference types="node" />
import { NodeWorkflow } from "@angular-devkit/schematics/tools";
import { virtualFs } from "@angular-devkit/core";
import * as fs from "fs";
export declare function getCollection(workflow: NodeWorkflow, name: string): import("@angular-devkit/schematics").Collection<import("@angular-devkit/schematics/tools").FileSystemCollectionDescription, import("@angular-devkit/schematics/tools").FileSystemSchematicDescription>;
export declare function readDefaultCollection(host: virtualFs.Host<fs.Stats>): Promise<any>;
