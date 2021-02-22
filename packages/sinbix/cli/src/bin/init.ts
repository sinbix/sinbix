import * as path from 'path';
import * as fs from 'fs';
import { parseRunOneOptions } from './parse-run-one-options';

export async function initLocal(workspace: string) {
  await import('@sinbix/core/src/utils/perf-logging');

  const supportedSinbixCommands = (await import('@sinbix/core/src/command-line/supported-sinbix-commands')).supportedSinbixCommands;
  const runOpts = runOneOptions(workspace);

  if (supportedSinbixCommands.includes(process.argv[2])) {
    (await import('@sinbix/core/src/command-line/sinbix-commands')).commandsObject
      .argv;
  } else {
    if (runOpts === false || process.env.SINBIX_SKIP_TASKS_RUNNER) {
      if (workspace && process.argv[2] === 'update') {
        console.log(
          `Sinbix provides a much improved version of "ng update". It runs the same migrations, but allows you to:`
        );
        console.log(`- rerun the same migration multiple times`);
        console.log(`- reorder migrations`);
        console.log(`- skip migrations`);
        console.log(`- fix migrations that "almost work"`);
        console.log(`- commit a partially migrated state`);
        console.log(`- change versions of packages to match org requirements`);
        console.log(
          `And, in general, it is lot more reliable for non-trivial workspaces. Read more at: https://sinbix.dev/latest/angular/workspace/update`
        );
        console.log(
          `Run "Sinbix migrate latest" to update to the latest version of Sinbix.`
        );
      } else {
        await loadCli(workspace);
      }
    } else {
      await (await import('@sinbix/core/src/command-line/run-one')).runOne(runOpts);
    }
  }
}

export async function initGlobal() {
  await import('@sinbix/cli/commander');
}

async function loadCli(workspace: string) {
  let cliPath: string;
  if (workspace) {
    cliPath = '@sinbix/cli/commander';
  } else {
    console.error(`Cannot recognize the workspace type.`);
    process.exit(1);
  }

  try {
    // const cli = require.resolve(cliPath, { paths: [workspace] });
    await import(cliPath);
  } catch (e) {
    console.error(`Could not find ${cliPath} module in this workspace.`, e);
    process.exit(1);
  }
}

function runOneOptions(
  workspace: string
): false | { project; target; configuration; parsedArgs } {
  try {
    const sinbixJson = JSON.parse(
      fs.readFileSync(path.join(workspace, 'sinbix.json')).toString()
    );

    const workspaceConfigJson = JSON.parse(
      fs
        .readFileSync(
          path.join(
            workspace, 'angular.json'
          )
        )
        .toString()
    );

    return parseRunOneOptions(
      sinbixJson,
      workspaceConfigJson,
      process.argv.slice(2)
    );
  } catch (e) {
    return false;
  }
}
