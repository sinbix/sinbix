import { createWorkflow, executeSchematic, parseOptions } from './utils';
import { getLogger, handleErrors } from "../../utils";
import { normalize, virtualFs } from "@angular-devkit/core";
import { NodeJsSyncHost } from "@angular-devkit/core/node";

export async function newCommand(
  root: string,
  args: string[],
  isVerbose = false
) {
  const sinbixArgs = ['--preset="empty"', `--sinbixWorkspaceRoot="${root}"`];

  sinbixArgs.push(...args);

  const parsedOptions = parseOptions(sinbixArgs);

  const logger = getLogger(isVerbose);

  const fsHost = new virtualFs.ScopedHost(
    new NodeJsSyncHost(),
    normalize(root)
  );

  const workflow = await createWorkflow(fsHost, root, parsedOptions);
  return executeSchematic('new', parsedOptions, workflow, logger);

  return handleErrors(logger, isVerbose, async () => {

  });
}
