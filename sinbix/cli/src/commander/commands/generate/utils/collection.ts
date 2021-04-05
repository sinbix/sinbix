import { NodeWorkflow } from "@angular-devkit/schematics/tools";
import { virtualFs } from "@angular-devkit/core";
import { HostTree } from "@angular-devkit/schematics";
import * as fs from "fs";

export function getCollection(workflow: NodeWorkflow, name: string) {
  const collection = workflow.engine.createCollection(name);
  if (!collection) throw new Error(`Cannot find collection '${name}'`);
  return collection;
}

export async function readDefaultCollection(host: virtualFs.Host<fs.Stats>) {
  const workspace = new HostTree(host).read('angular.json')?.toString();
  const workspaceJson = workspace ? JSON.parse(workspace) : null;
  return workspaceJson?.cli ? workspaceJson.cli.defaultCollection : null;
}
