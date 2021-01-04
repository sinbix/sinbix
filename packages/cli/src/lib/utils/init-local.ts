import * as path from 'path';
import * as fs from 'fs';
import { parseRunOneOptions } from './parse-run-one-options';

/**
 * Nx is being run inside a workspace.
 *
 * @param workspace Relevant local workspace properties
 */
process.env.NX_CLI_SET = 'true';

export function initLocal(workspace: string) {
  require('@nrwl/workspace/' + 'src/utils/perf-logging');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const supportedNxCommands = require('@nrwl/workspace/' +
    'src/command-line/supported-nx-commands').supportedNxCommands;
  const runOpts = runOneOptions(workspace);

  if (supportedNxCommands.includes(process.argv[2])) {
    // required to make sure nrwl/workspace import works
    if (workspace) {
      require('@sinbix/cli/src/compat/compat.js');
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('@nrwl/workspace' + '/src/command-line/nx-commands').commandsObject
      .argv;
  } else {
    if (runOpts === false || process.env.NX_SKIP_TASKS_RUNNER) {
      if (workspace && process.argv[2] === 'update') {
        console.log(
          `Nx provides a much improved version of "ng update". It runs the same migrations, but allows you to:`
        );
        console.log(`- rerun the same migration multiple times`);
        console.log(`- reorder migrations`);
        console.log(`- skip migrations`);
        console.log(`- fix migrations that "almost work"`);
        console.log(`- commit a partially migrated state`);
        console.log(`- change versions of packages to match org requirements`);
        console.log(
          `And, in general, it is lot more reliable for non-trivial workspaces. Read more at: https://nx.dev/latest/angular/workspace/update`
        );
        console.log(
          `Run "nx migrate latest" to update to the latest version of Nx.`
        );
      } else {
        loadCli(workspace);
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('@nrwl/workspace' + '/src/command-line/run-one').runOne(runOpts);
    }
  }
}

function loadCli(workspace: string) {
  let cliPath: string;
  if (workspace) {
    cliPath = '@sinbix/cli/index.js';
  } else {
    console.error(`Cannot recognize the workspace type.`);
    process.exit(1);
  }

  try {
    const cli = require.resolve(cliPath, { paths: [workspace] });
    require(cli);
  } catch (e) {
    console.error(`Could not find ${cliPath} module in this workspace.`, e);
    process.exit(1);
  }
}

function runOneOptions(
  workspace: string
): false | { project; target; configuration; parsedArgs } {
  try {
    const nxJson = JSON.parse(
      fs.readFileSync(path.join(workspace, 'nx.json')).toString()
    );

    const workspaceConfigJson = JSON.parse(
      fs
        .readFileSync(
          path.join(
            workspace, 'workspace.json'
          )
        )
        .toString()
    );

    return parseRunOneOptions(
      nxJson,
      workspaceConfigJson,
      process.argv.slice(2)
    );
  } catch (e) {
    return false;
  }
}
