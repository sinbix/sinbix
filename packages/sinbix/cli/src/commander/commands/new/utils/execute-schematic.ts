import {
  NodeWorkflow,
} from '@angular-devkit/schematics/tools';
import {
  logging,
} from '@angular-devkit/core';
import { join } from 'path';
import { NewOptions } from "./models";
import { createRecorder } from "../../generate/utils";

export async function executeSchematic(
  options: NewOptions,
  workflow: NodeWorkflow,
  logger: logging.Logger
) {
  const record = { loggingQueue: [] as string[], error: false };
  workflow.reporter.subscribe(createRecorder(record, logger));

  await workflow
    .execute({
      collection: join(require.resolve('@sinbix/common'), '../../collection.json'),
      schematic: 'new',
      options: options.schematicOptions,
      logger: logger,
    })
    .toPromise();

  if (!record.error) {
    record.loggingQueue.forEach((log) => logger.info(log));
  }

  if (options.dryRun) {
    logger.warn(`\nNOTE: The "dryRun" flag means no changes were made.`);
  }
}
