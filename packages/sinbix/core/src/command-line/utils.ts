import * as yargsParser from 'yargs-parser';
import * as yargs from 'yargs';
import * as fileUtils from '../file-utils';
import { SinbixAffectedConfig } from '../shared-interfaces';
import { output } from '../utils/output';

const runOne = [
  'target',
  'configuration',
  'prod',
  'runner',
  'parallel',
  'maxParallel',
  'max-parallel',
  'exclude',
  'onlyFailed',
  'only-failed',
  'verbose',
  'help',
  'version',
  'withDeps',
  'with-deps',
  'skipSinbixCache',
  'skip-sinbix-cache',
  'scan',
];

const runMany = [...runOne, 'projects', 'quiet', 'all'];

const runAffected = [
  ...runOne,
  'untracked',
  'uncommitted',
  'all',
  'base',
  'head',
  'files',
  'quiet',
  'plain',
  'select',
];

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

const ignoreArgs = ['$0', '_'];

export function splitArgsIntoSinbixArgsAndOverrides(
  args: yargs.Arguments,
  mode: 'run-one' | 'run-many' | 'affected' | 'print-affected',
  options = { printWarnings: true }
): { sinbixArgs: SinbixArgs; overrides: yargs.Arguments } {
  const sinbixSpecific =
    mode === 'run-one' ? runOne : mode === 'run-many' ? runMany : runAffected;

  const sinbixArgs: RawSinbixArgs = {};
  const overrides = yargsParser(args._ as any);
  delete overrides._;

  Object.entries(args).forEach(([key, value]) => {
    if (sinbixSpecific.includes(key)) {
      sinbixArgs[key] = value;
    } else if (!ignoreArgs.includes(key)) {
      overrides[key] = value;
    }
  });

  if (mode === 'run-many') {
    if (!sinbixArgs.projects) {
      sinbixArgs.projects = [];
    } else {
      sinbixArgs.projects = (args.projects as string)
        .split(',')
        .map((p: string) => p.trim());
    }
  }

  if (sinbixArgs.prod) {
    delete sinbixArgs.prod;
    sinbixArgs.configuration = 'production';
  }

  if (mode === 'affected') {
    if (options.printWarnings) {
      printArgsWarning(sinbixArgs);
    }
    if (
      !sinbixArgs.files &&
      !sinbixArgs.uncommitted &&
      !sinbixArgs.untracked &&
      !sinbixArgs.base &&
      !sinbixArgs.head &&
      !sinbixArgs.all &&
      args._.length >= 2
    ) {
      sinbixArgs.base = args._[0] as string;
      sinbixArgs.head = args._[1] as string;
    } else if (!sinbixArgs.base) {
      const affectedConfig = getAffectedConfig();

      sinbixArgs.base = affectedConfig.defaultBase;
    }
  }

  if (!sinbixArgs.skipSinbixCache) {
    sinbixArgs.skipSinbixCache = false;
  }

  return { sinbixArgs: sinbixArgs, overrides };
}

export function getAffectedConfig(): SinbixAffectedConfig {
  const config = fileUtils.readSinbixJson();
  const defaultBase = 'master';

  if (config.affected) {
    return {
      defaultBase: config.affected.defaultBase || defaultBase,
    };
  } else {
    return {
      defaultBase,
    };
  }
}

function printArgsWarning(options: SinbixArgs) {
  const { files, uncommitted, untracked, base, head, all } = options;
  const affectedConfig = getAffectedConfig();

  if (!files && !uncommitted && !untracked && !base && !head && !all) {
    output.note({
      title: `Affected criteria defaulted to --base=${output.bold(
        `${affectedConfig.defaultBase}`
      )} --head=${output.bold('HEAD')}`,
    });
  }

  if (all) {
    output.warn({
      title: `Running affected:* commands with --all can result in very slow builds.`,
      bodyLines: [
        output.bold('--all') +
          ' is not meant to be used for any sizable project or to be used in CI.',
        '',
        output.colors.gray(
          'Learn more about checking only what is affected: '
        ) + 'https://sinbix.dev/guides/monorepo-affected.',
      ],
    });
  }
}
