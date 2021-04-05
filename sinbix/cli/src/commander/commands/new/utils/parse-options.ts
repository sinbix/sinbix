import * as minimist from 'minimist';
import { convertToCamelCase } from "../../../utils";
import { NewOptions } from "./models";

export function parseOptions(
  args: string[]
): NewOptions {
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

  const res = {
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
