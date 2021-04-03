/// <reference types="node" />
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { logging } from '@angular-devkit/core';
export interface ProcessOutput {
    write(buffer: string | Buffer): boolean;
}
export interface LoggerFlags {
    verbose?: boolean;
}
export declare const getLogger: (flags: LoggerFlags) => logging.Logger;
export declare function handleErrors(logger: logging.Logger, flags: LoggerFlags, fn: Function): Promise<any>;
