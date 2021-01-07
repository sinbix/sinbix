#!/usr/bin/env node
(Symbol as any).observable = Symbol('observable polyfill');
import { findWorkspaceRoot } from "../src";
import { initGlobal, initLocal } from "../src";

(async () => {
  const workspace = findWorkspaceRoot(process.cwd());

  if (workspace) {
    await initLocal(workspace);
  } else {
    await initGlobal();
  }
})();
