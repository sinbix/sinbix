/// <reference types="node" />
import { virtualFs } from "@angular-devkit/core";
import * as fs from "fs";
import { NodeWorkflow } from "@angular-devkit/schematics/tools";
import { GenerateOptions } from "./models";
export declare function createWorkflow(fsHost: virtualFs.Host<fs.Stats>, root: string, opts: GenerateOptions): Promise<NodeWorkflow>;
