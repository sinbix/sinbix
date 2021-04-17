import { ProjectGraph } from '@sinbix/core';
import { readJsonFile, writeJsonFile } from '@sinbix/core/utils/fileutils';
import { OUT_FILENAME } from './config';
import { BuildBuilderOptions } from './models';

export function generatePackageJson(
  projectName: string,
  graph: ProjectGraph,
  options: BuildBuilderOptions
) {
  const npmDeps = findAllNpmDeps(projectName, graph);
  // default package.json if one does not exist
  let packageJson = {
    name: projectName,
    version: '0.0.1',
    main: OUT_FILENAME,
    dependencies: {},
  };

  try {
    packageJson = readJsonFile(`${options.projectRoot}/package.json`);
    if (!packageJson.dependencies) {
      packageJson.dependencies = {};
    }
  } catch (e) {}

  const rootPackageJson = readJsonFile(`${options.root}/package.json`);

  Object.entries(npmDeps).forEach(([packageName, version]) => {
    // don't include devDeps
    if (rootPackageJson.devDependencies?.[packageName]) {
      return;
    }

    packageJson.dependencies[packageName] = version;
  });

  writeJsonFile(`${options.outputPath}/package.json`, packageJson);
}

function findAllNpmDeps(
  projectName: string,
  graph: ProjectGraph,
  list: { [packageName: string]: string } = {},
  seen = new Set<string>()
) {
  if (seen.has(projectName)) {
    return list;
  }

  seen.add(projectName);

  const node = graph.nodes[projectName];

  if (node.type === 'npm') {
    list[node.data.packageName] = node.data.version;
  }
  graph.dependencies[projectName]?.forEach((dep) => {
    findAllNpmDeps(dep.target, graph, list, seen);
  });

  return list;
}
