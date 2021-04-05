import { normalize, virtualFs } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';

import { handleErrors, getLogger, LoggerFlags } from "../../utils";
import {
  createWorkflow,
  getCollection,
  parseOptions,
  readDefaultCollection,
  runSchematic,
} from './utils';

export async function generateCommand(
  root: string,
  args: string[],
  flags: LoggerFlags
) {
  const logger = getLogger(flags);

  return handleErrors(logger, flags, async () => {
    const fsHost = new virtualFs.ScopedHost(
      new NodeJsSyncHost(),
      normalize(root)
    );

    const opts = parseOptions(args, await readDefaultCollection(fsHost));

    const workflow = await createWorkflow(fsHost, root, opts);
    const collection = getCollection(workflow, opts.collectionName);
    const schematic = collection.createSchematic(opts.schematicName, true);
    return runSchematic(
      root,
      workflow,
      logger,
      { ...opts, schematicName: schematic.description.name },
      schematic
    );
  });
}
