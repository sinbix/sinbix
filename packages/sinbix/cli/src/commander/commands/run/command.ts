import { Architect } from '@angular-devkit/architect';
import { WorkspaceNodeModulesArchitectHost } from '@angular-devkit/architect/node';
import { json, JsonObject, schema, workspaces } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { join } from 'path';

import {
  getLogger,
  coerceTypes,
  convertAliases,
  handleErrors,
  Options,
  Schema,
} from '../../utils';
import { parseRunOpts, printRunHelp, validate } from './utils';

export async function runCommand(
  root: string,
  args: string[],
  isVerbose: boolean
) {
  const logger = getLogger({ verbose: isVerbose });

  return handleErrors(logger, { verbose: isVerbose }, async () => {
    const fsHost = new NodeJsSyncHost();
    const { workspace } = await workspaces.readWorkspace(
      join(root, 'angular.json'),
      workspaces.createWorkspaceHost(fsHost)
    );

    const opts = parseRunOpts(
      args,
      workspace.extensions['defaultProject'] as string,
      logger
    );

    validate(workspace, opts);

    const registry = new json.schema.CoreSchemaRegistry();
    registry.addPostTransform(schema.transforms.addUndefinedDefaults);
    const architectHost = new WorkspaceNodeModulesArchitectHost(
      workspace,
      root
    );
    const architect = new Architect(architectHost, registry);

    const builderConf = await architectHost.getBuilderNameForTarget({
      project: opts.project,
      target: opts.target,
    });
    const builderDesc = await architectHost.resolveBuilder(builderConf);
    const flattenedSchema = await registry
      .flatten(builderDesc.optionSchema as json.JsonObject)
      .toPromise();

    if (opts.help) {
      printRunHelp(opts, flattenedSchema as Schema, logger);
      return 0;
    }

    const runOptions = normalizeOptions(
      opts.runOptions,
      flattenedSchema as Schema
    );
    const run = await architect.scheduleTarget(
      {
        project: opts.project,
        target: opts.target,
        configuration: opts.configuration,
      },
      runOptions as JsonObject,
      { logger }
    );
    const result = await run.output.toPromise();
    await run.stop();
    return result.success ? 0 : 1;
  });
}

function normalizeOptions(opts: Options, schema: Schema): Options {
  return convertAliases(coerceTypes(opts, schema), schema, false);
}
