import * as minimist from 'minimist';
import { GenerateOptions } from './models';
import { commandName, convertToCamelCase } from '../../../utils';

export function parseOptions(
  args: string[],
  defaultCollection: string | null
): GenerateOptions {
  const schematicOptions = convertToCamelCase(
    minimist(args, {
      boolean: ['help', 'dryRun', 'debug', 'force', 'interactive'],
      alias: {
        dryRun: 'dry-run',
        d: 'dryRun',
      },
      default: {
        debug: false,
        dryRun: false,
        interactive: true,
      },
    })
  );

  let collectionName: string | null = null;
  let schematicName: string | null = null;
  if (
    !schematicOptions['_'] ||
    (schematicOptions['_'] as string[]).length === 0
  ) {
    throwInvalidInvocation();
  }
  [collectionName, schematicName] = (schematicOptions['_'] as string[])
    .shift()
    .split(':');

  if (!schematicName) {
    schematicName = collectionName;
    collectionName = defaultCollection;
  }

  if (!collectionName) {
    throwInvalidInvocation();
  }

  const res = {
    collectionName,
    schematicName,
    schematicOptions,
    help: schematicOptions.help as boolean,
    debug: schematicOptions.debug as boolean,
    dryRun: schematicOptions.dryRun as boolean,
    force: schematicOptions.force as boolean,
    interactive: schematicOptions.interactive as boolean,
    defaults: schematicOptions.defaults as boolean,
  };

  delete schematicOptions.debug;
  delete schematicOptions.d;
  delete schematicOptions.dryRun;
  delete schematicOptions.force;
  delete schematicOptions.interactive;
  delete schematicOptions.defaults;
  delete schematicOptions.help;
  delete schematicOptions['--'];

  return res;
}

function throwInvalidInvocation() {
  throw new Error(
    `Specify the schematic name (e.g., ${commandName} generate collection-name:schematic-name)`
  );
}
