"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = void 0;
const tslib_1 = require("tslib");
const app_root_1 = require("../utils/app-root");
const output_1 = require("../utils/output");
const plugins_1 = require("../plugins");
exports.list = {
    command: 'list [plugin]',
    describe: 'Lists installed plugins, capabilities of installed plugins and other available plugins.',
    builder: (yargs) => yargs.positional('plugin', {
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
function listHandler(args) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (args.plugin) {
            plugins_1.listPluginCapabilities(args.plugin);
        }
        else {
            const corePlugins = yield plugins_1.fetchCorePlugins();
            const installedPlugins = plugins_1.getInstalledPluginsFromPackageJson(app_root_1.appRootPath, corePlugins);
            plugins_1.listInstalledPlugins(installedPlugins);
            plugins_1.listCorePlugins(installedPlugins, corePlugins);
            output_1.output.note({
                title: `Use "sinbix list [plugin]" to find out more`,
            });
        }
    });
}
//# sourceMappingURL=list.js.map