import * as yargs from 'yargs';
import { RawSinbixArgs } from './utils';
export declare function affected(command: 'apps' | 'libs' | 'dep-graph' | 'print-affected' | 'affected', parsedArgs: yargs.Arguments & RawSinbixArgs): Promise<void>;
