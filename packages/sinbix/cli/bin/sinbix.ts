#!/usr/bin/env node
(Symbol as any).observable = Symbol('observable polyfill');
import {
  initGlobal,
  initLocal,
  findWorkspaceRoot
} from '../src/bin';

(async () => {
  const workspace = findWorkspaceRoot(process.cwd());

  if (workspace) {
    await initLocal(workspace);
  } else {
    await initGlobal();
  }
})();
