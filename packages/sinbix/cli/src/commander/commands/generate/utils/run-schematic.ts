import {
  FileSystemCollectionDescription,
  FileSystemSchematicDescription,
  NodeWorkflow,
} from '@angular-devkit/schematics/tools';
import { experimental, logging, normalize, Path } from '@angular-devkit/core';
import { Schematic } from '@angular-devkit/schematics';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import {
  coerceTypes,
  convertAliases,
  lookupUnmatched,
  Options,
  Schema,
} from '../../../utils';
import { GenerateOptions } from './models';
import { printGenHelp } from './print-gen-help';
import { createRecorder } from './create-recorder';

export async function runSchematic(
  root: string,
  workflow: NodeWorkflow,
  logger: logging.Logger,
  opts: GenerateOptions,
  schematic: Schematic<
    FileSystemCollectionDescription,
    FileSystemSchematicDescription
  >,
  allowAdditionalArgs = false
): Promise<number> {
  const flattenedSchema = (await workflow.registry
    .flatten(schematic.description.schemaJson)
    .toPromise()) as Schema;

  if (opts.help) {
    printGenHelp(opts, flattenedSchema as Schema, logger);
    return 0;
  }

  const defaults =
    opts.schematicName === 'new'
      ? {}
      : await getSchematicDefaults(
          root,
          opts.collectionName,
          opts.schematicName
        );
  const record = { loggingQueue: [] as string[], error: false };
  workflow.reporter.subscribe(createRecorder(record, logger));

  const schematicOptions = normalizeOptions(
    opts.schematicOptions,
    flattenedSchema
  );

  if (schematicOptions['--'] && !allowAdditionalArgs) {
    schematicOptions['--'].forEach((unmatched) => {
      const message =
        `Could not match option '${unmatched.name}' to the ${opts.collectionName}:${opts.schematicName} schema.` +
        (unmatched.possible.length > 0
          ? ` Possible matches : ${unmatched.possible.join()}`
          : '');
      logger.fatal(message);
    });

    return 1;
  }

  await workflow
    .execute({
      collection: opts.collectionName,
      schematic: opts.schematicName,
      options: { ...defaults, ...schematicOptions },
      debug: opts.debug,
      logger,
    })
    .toPromise();

  if (!record.error) {
    record.loggingQueue.forEach((log) => logger.info(log));
  }

  if (opts.dryRun) {
    logger.warn(`\nNOTE: The "dryRun" flag means no changes were made.`);
  }
  return 0;
}

function normalizeOptions(opts: Options, schema: Schema): Options {
  return lookupUnmatched(
    convertAliases(coerceTypes(opts, schema), schema, true),
    schema
  );
}

async function getSchematicDefaults(
  root: string,
  collection: string,
  schematic: string
) {
  const workspace = await new experimental.workspace.Workspace(
    normalize(root) as Path,
    new NodeJsSyncHost()
  )
    .loadWorkspaceFromHost('angular.json' as Path)
    .toPromise();

  let result = {};
  if (workspace.getSchematics()) {
    const schematicObject = workspace.getSchematics()[
      `${collection}:${schematic}`
    ];
    if (schematicObject) {
      result = { ...result, ...(schematicObject as {}) };
    }
    const collectionObject = workspace.getSchematics()[collection];
    if (
      typeof collectionObject == 'object' &&
      !Array.isArray(collectionObject)
    ) {
      result = { ...result, ...(collectionObject[schematic] as {}) };
    }
  }
  return result;
}
