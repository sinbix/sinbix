import { CorePlugin, PluginCapabilities } from './models';
export declare function getInstalledPluginsFromPackageJson(workspaceRoot: string, corePlugins: CorePlugin[]): Array<PluginCapabilities>;
export declare function listInstalledPlugins(installedPlugins: PluginCapabilities[]): void;
