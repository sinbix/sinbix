import * as yargs from 'yargs';
import { appRootPath } from '../utils/app-root';
import { output } from '../utils/output';
import {
  fetchCorePlugins,
  getInstalledPluginsFromPackageJson,
  listCorePlugins,
  listInstalledPlugins,
  listPluginCapabilities,
} from '../plugins';

export interface YargsListArgs extends yargs.Arguments, ListArgs {}

interface ListArgs {
  plugin?: string;
}

export const list = {
  command: 'list [plugin]',
  describe:
    'Lists installed plugins, capabilities of installed plugins and other available plugins.',
  builder: (yargs: yargs.Argv) =>
    yargs.positional('plugin', {
      default: null,
      description: 'The name of an installed plugin to query',
    }),
  handler: listHandler,
};

/**
 * List available plugins or capabilities within a specific plugin
 *
 * @remarks
 *
 * Must be run within an Sinbix workspace
 *
 */
async function listHandler(args: YargsListArgs) {
  if (args.plugin) {
    listPluginCapabilities(args.plugin);
  } else {
    const corePlugins = await fetchCorePlugins();
    const installedPlugins = getInstalledPluginsFromPackageJson(
      appRootPath,
      corePlugins
    );
    listInstalledPlugins(installedPlugins);
    listCorePlugins(installedPlugins, corePlugins);

    output.note({
      title: `Use "sinbix list [plugin]" to find out more`,
    });
  }
}
