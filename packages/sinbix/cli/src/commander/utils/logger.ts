/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { logging } from '@angular-devkit/core';
import { UnsuccessfulWorkflowExecution } from '@angular-devkit/schematics';
import { createConsoleLogger } from '@angular-devkit/core/node';
import chalk from 'chalk';

export interface ProcessOutput {
  write(buffer: string | Buffer): boolean;
}

export interface LoggerFlags {
  verbose?: boolean;
}

export const getLogger = (flags: LoggerFlags): logging.Logger => {
  const SINBIX_PREFIX = `${chalk.cyan('>')} ${chalk.inverse(
    chalk.bold(chalk.cyan(' SINBIX '))
  )}`;

  const SINBIX_ERROR = chalk.inverse(chalk.bold(chalk.red(' ERROR ')));

  return createConsoleLogger(flags.verbose, process.stdout, process.stderr, {
    warn: (s) => chalk.bold(chalk.yellow(s)),
    error: (s) => {
      if (s.startsWith('SINBIX ')) {
        return `\n${SINBIX_ERROR} ${chalk.bold(
          chalk.red(s.substr(3))
        )}\n`;
      }

      return chalk.bold(chalk.red(s));
    },
    fatal: (s) => chalk.bold(chalk.red(s)),
    info: (s) => {
      if (s.startsWith('SINBIX ')) {
        return `\n${SINBIX_PREFIX} ${chalk.bold(s.substr(3))}\n`;
      }

      return chalk.white(s);
    },
  });
};

export async function handleErrors(
  logger: logging.Logger,
  flags: LoggerFlags,
  fn: Function
) {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof UnsuccessfulWorkflowExecution) {
      logger.fatal('The Schematic workflow failed. See above.');
    } else {
      logger.fatal(err.message);
    }
    if (flags?.verbose && err.stack) {
      logger.info(err.stack);
    }

    return 1;
  }
}
