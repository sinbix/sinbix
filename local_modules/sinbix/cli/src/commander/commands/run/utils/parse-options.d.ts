import { logging } from '@angular-devkit/core';
import { RunOptions } from './models';
export declare function parseRunOpts(args: string[], defaultProjectName: string | null, logger: logging.Logger): RunOptions;
