import chalk from 'chalk';
import { output } from '../utils/output';
import { CorePlugin, PluginCapabilities } from './models';

export function fetchCorePlugins() {
  const corePlugins: CorePlugin[] = [
    {
      name: '@sinbix/core',
      capabilities: 'builders,schematics',
    },
  ];
  return corePlugins;
}

export function listCorePlugins(
  installedPlugins: PluginCapabilities[],
  corePlugins: CorePlugin[]
) {
  const installedPluginsMap: Set<string> = new Set<string>(
    installedPlugins.map((p) => p.name)
  );

  const alsoAvailable = corePlugins.filter(
    (p) => !installedPluginsMap.has(p.name)
  );

  if (alsoAvailable.length) {
    output.log({
      title: `Also available:`,
      bodyLines: alsoAvailable.map((p) => {
        return `${chalk.bold(p.name)} (${p.capabilities})`;
      }),
    });
  }
}
