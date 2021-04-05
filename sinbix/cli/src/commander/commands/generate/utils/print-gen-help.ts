import { logging } from '@angular-devkit/core';
import { GenerateOptions } from './models';
import { commandName, printHelp, Schema } from '../../../utils';

export function printGenHelp(
  opts: GenerateOptions,
  schema: Schema,
  logger: logging.Logger
) {
  printHelp(
    `${commandName} generate ${opts.collectionName}:${opts.schematicName}`,
    {
      ...schema,
      properties: {
        ...schema.properties,
        dryRun: {
          type: 'boolean',
          default: false,
          description: `Runs through and reports activity without writing to disk.`,
        },
      },
    },
    logger
  );
}
