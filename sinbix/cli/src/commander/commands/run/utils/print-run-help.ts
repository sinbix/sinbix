import { logging } from '@angular-devkit/core';
import { commandName, printHelp, Schema } from '../../../utils';
import { RunOptions } from './models';

export function printRunHelp(
  opts: RunOptions,
  schema: Schema,
  logger: logging.Logger
) {
  printHelp(
    `${commandName} run ${opts.project}:${opts.target}`,
    schema,
    logger
  );
}
