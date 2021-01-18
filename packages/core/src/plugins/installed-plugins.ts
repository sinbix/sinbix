import { terminal } from '@angular-devkit/core';
import { readJsonFile } from '../utils/fileutils';
import { output } from '../utils/output';
import { CommunityPlugin, CorePlugin, PluginCapabilities } from './models';
import { getPluginCapabilities } from './plugin-capabilities';
import { hasElements } from './shared';

export function getInstalledPluginsFromPackageJson(
  workspaceRoot: string,
  corePlugins: CorePlugin[],
  communityPlugins: CommunityPlugin[]
): Array<PluginCapabilities> {
  const packageJson = readJsonFile(`${workspaceRoot}/package.json`);

  const plugins = new Set([
    ...corePlugins.map((p) => p.name),
    ...communityPlugins.map((p) => p.name),
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.devDependencies || {}),
  ]);

  return [...plugins]
    .filter((name) => {
      try {
        // Check for `package.json` existence instead of requiring the module itself
        // because malformed entries like `main`, may throw false exceptions.
        require.resolve(`${name}/package.json`, { paths: [workspaceRoot] });
        return true;
      } catch {
        return false;
      }
    })
    .sort()
    .map((name) => getPluginCapabilities(workspaceRoot, name))
    .filter((x) => x && !!(x.schematics || x.builders));
}

export function listInstalledPlugins(installedPlugins: PluginCapabilities[]) {
  output.log({
    title: `Installed plugins:`,
    bodyLines: installedPlugins.map((p) => {
      const capabilities = [];
      if (hasElements(p.builders)) {
        capabilities.push('builders');
      }
      if (hasElements(p.schematics)) {
        capabilities.push('schematics');
      }
      return `${terminal.bold(p.name)} (${capabilities.join()})`;
    }),
  });
}
