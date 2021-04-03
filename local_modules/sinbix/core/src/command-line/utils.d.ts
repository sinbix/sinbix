import * as yargs from 'yargs';
import { SinbixAffectedConfig } from '../shared-interfaces';
export interface RawSinbixArgs extends SinbixArgs {
    prod?: boolean;
}
export interface SinbixArgs {
    target?: string;
    configuration?: string;
    runner?: string;
    parallel?: boolean;
    maxParallel?: number;
    'max-parallel'?: number;
    untracked?: boolean;
    uncommitted?: boolean;
    all?: boolean;
    base?: string;
    head?: string;
    exclude?: string[];
    files?: string[];
    onlyFailed?: boolean;
    'only-failed'?: boolean;
    verbose?: boolean;
    help?: boolean;
    version?: boolean;
    quiet?: boolean;
    plain?: boolean;
    withDeps?: boolean;
    'with-deps'?: boolean;
    projects?: string[];
    select?: string;
    skipSinbixCache?: boolean;
    'skip-sinbix-cache'?: boolean;
    scan?: boolean;
}
export declare function splitArgsIntoSinbixArgsAndOverrides(args: yargs.Arguments, mode: 'run-one' | 'run-many' | 'affected' | 'print-affected', options?: {
    printWarnings: boolean;
}): {
    sinbixArgs: SinbixArgs;
    overrides: yargs.Arguments;
};
export declare function getAffectedConfig(): SinbixAffectedConfig;
