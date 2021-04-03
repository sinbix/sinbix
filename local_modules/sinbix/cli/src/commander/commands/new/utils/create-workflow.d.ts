/// <reference types="node" />
import { virtualFs } from "@angular-devkit/core";
import { NodeWorkflow } from "@angular-devkit/schematics/tools";
import { NewOptions } from "./models";
import * as fs from 'fs';
export declare function createWorkflow(fsHost: virtualFs.Host<fs.Stats>, root: string, opts: NewOptions): Promise<NodeWorkflow>;
