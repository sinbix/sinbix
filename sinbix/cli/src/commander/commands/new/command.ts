import { normalize, virtualFs } from "@angular-devkit/core";
import { NodeJsSyncHost } from "@angular-devkit/core/node";
import { createWorkflow, executeSchematic, parseOptions } from "./utils";
import { getLogger, handleErrors, LoggerFlags } from "../../utils";

export async function newCommand(
  root: string,
  args: string[],
  flags?: LoggerFlags
) {
  const sinbixArgs = ['--preset="empty"', `--sinbixWorkspaceRoot="${root}"`];

  sinbixArgs.push(...args);

  const parsedOptions = parseOptions(sinbixArgs);

  const logger = getLogger(flags);

  return handleErrors(logger, flags, async () => {

    const fsHost = new virtualFs.ScopedHost(
      new NodeJsSyncHost(),
      normalize(root)
    );

    const workflow = await createWorkflow(fsHost, root, parsedOptions);
    return executeSchematic(parsedOptions, workflow, logger);
  });
}
