#!/usr/bin/env node

// polyfill rxjs observable to avoid issues with multiple version fo Observable installed in node_modules
// https://twitter.com/BenLesh/status/1192478226385428483?s=20

(Symbol as any).observable = Symbol('observable polyfill');
import chalk from 'chalk';
import { findWorkspaceRoot } from '../src/lib/utils/find-workspace-root';
import { initLocal } from '../src/lib/utils/init-local';
import { output } from '../src/lib/utils/output';

const workspace = findWorkspaceRoot(process.cwd());

// if (!workspace) {
//   output.log({
//     title: `The current directory isn't part of an Nx workspace.`,
//     bodyLines: [
//       `To create a workspace run:`,
//       chalk.bold.white(`npx create-nx-workspace@latest <workspace name>`),
//     ],
//   });
//
//   output.note({
//     title: `For more information please visit https://nx.dev/`,
//   });
//   process.exit(1);
// }

// Make sure that a local copy of Nx exists in workspace
let localNx: string;
try {
  localNx = require.resolve('@sinbix/cli/bin/sinbix.js', {
    paths: [workspace],
  });
} catch (e) {
  output.error({
    title: `Could not find Nx modules in this workspace.`,
    bodyLines: [`Have you run ${chalk.bold.white(`npm/yarn install`)}?`],
  });
  process.exit(1);
}

if (localNx === require.resolve('@sinbix/cli/bin/sinbix.js')) {
  initLocal(workspace);
} else {
  // Nx is being run from globally installed CLI - hand off to the local
  require(localNx);
}
