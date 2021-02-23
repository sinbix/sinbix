import {
  NodeWorkflow,
  validateOptionsWithSchema,
} from '@angular-devkit/schematics/tools';
import {
  JsonObject,
  logging,
  schema,
  tags,
  terminal,
} from '@angular-devkit/core';
import { output } from '@sinbix/core';
import { UnsuccessfulWorkflowExecution } from '@angular-devkit/schematics';
import { join } from 'path';
import { createPromptProvider } from './create-prompt-provider';
import { NewOptions } from "./models";

export async function executeSchematic(
  schematicName: string,
  options: NewOptions,
  workflow: NodeWorkflow,
  logger: logging.Logger
) {
  return workflow
    .execute({
      collection: join(require.resolve('@sinbix/common'), '../../collection.json'),
      schematic: schematicName,
      options: options.schematicOptions,
      logger: logger,
    })
    .toPromise();
}
