import { logging } from '@angular-devkit/core';
import { DryRunEvent } from '@angular-devkit/schematics';
export declare function createRecorder(record: {
    loggingQueue: string[];
    error: boolean;
}, logger: logging.Logger): (event: DryRunEvent) => void;
