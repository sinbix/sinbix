import { NodeWorkflow } from '@angular-devkit/schematics/tools';
import { logging } from '@angular-devkit/core';
import { NewOptions } from "./models";
export declare function executeSchematic(options: NewOptions, workflow: NodeWorkflow, logger: logging.Logger): Promise<void>;
