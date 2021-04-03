#!/usr/bin/env node
(Symbol as any).observable = Symbol('observable polyfill');
import chalk from 'chalk';
import { initGlobal, initLocal, findWorkspaceRoot, output } from '../src/bin';

(async () => {
  const workspace = findWorkspaceRoot(process.cwd());

  let localCli;

  if (workspace) {
    try {
      localCli = require.resolve('@sinbix/cli/bin/sinbix.js', {
        paths: [workspace],
      });
    } catch (e) {
      output.error({
        title: `Could not find Sinbix modules in this workspace.`,
        bodyLines: [`Have you run ${chalk.bold.white(`npm install`)}?`],
      });
      process.exit(1);
    }
  }

  const sinbixCli = require.resolve('@sinbix/cli/bin/sinbix.js');

  if (sinbixCli === localCli) {
    await initLocal(workspace);
  } else {
    if (localCli) {
      await import(localCli);
    } else {
      await initGlobal();
    }
  }
})();
