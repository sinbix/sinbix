/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { logging, terminal } from '@angular-devkit/core';
import { UnsuccessfulWorkflowExecution } from '@angular-devkit/schematics';
import { createConsoleLogger } from '@angular-devkit/core/node';

export interface ProcessOutput {
  write(buffer: string | Buffer): boolean;
}

export interface LoggerFlags {
  verbose?: boolean;
}

export const getLogger = (flags: LoggerFlags): logging.Logger => {
  const SINBIX_PREFIX = `${terminal.cyan('>')} ${terminal.inverse(
    terminal.bold(terminal.cyan(' SINBIX '))
  )}`;

  const SINBIX_ERROR = terminal.inverse(terminal.bold(terminal.red(' ERROR ')));

  return createConsoleLogger(flags.verbose, process.stdout, process.stderr, {
    warn: (s) => terminal.bold(terminal.yellow(s)),
    error: (s) => {
      if (s.startsWith('SINBIX ')) {
        return `\n${SINBIX_ERROR} ${terminal.bold(
          terminal.red(s.substr(3))
        )}\n`;
      }

      return terminal.bold(terminal.red(s));
    },
    fatal: (s) => terminal.bold(terminal.red(s)),
    info: (s) => {
      if (s.startsWith('SINBIX ')) {
        return `\n${SINBIX_PREFIX} ${terminal.bold(s.substr(3))}\n`;
      }

      return terminal.white(s);
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
