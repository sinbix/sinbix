#!/usr/bin/env node

(Symbol as any).observable = Symbol('observable polyfill');
import { findWorkspaceRoot } from '../src/lib/utils/find-workspace-root';
import { initGlobal, initLocal } from "../src/lib/utils/init";

const workspace = findWorkspaceRoot(process.cwd());

if (workspace) {
  initLocal(workspace);
} else {
  initGlobal();
}
