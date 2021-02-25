import {
  normalize,
  virtualFs
} from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { HostTree } from '@angular-devkit/schematics';
import { NodeWorkflow } from '@angular-devkit/schematics/tools';
import * as fs from 'fs';

import { handleErrors, getLogger } from '../../utils';
import { createWorkflow, parseOptions, runSchematic } from "./utils";

export async function generateCommand(
  root: string,
  args: string[],
  isVerbose = false
) {
  const logger = getLogger({ verbose: isVerbose });

  return handleErrors(logger, { verbose: isVerbose }, async () => {
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

function getCollection(workflow: NodeWorkflow, name: string) {
  const collection = workflow.engine.createCollection(name);
  if (!collection) throw new Error(`Cannot find collection '${name}'`);
  return collection;
}

async function readDefaultCollection(host: virtualFs.Host<fs.Stats>) {
  const workspace = new HostTree(host).read('angular.json')?.toString();
  const workspaceJson = workspace ? JSON.parse(workspace) : null;
  return workspaceJson?.cli ? workspaceJson.cli.defaultCollection : null;
}
