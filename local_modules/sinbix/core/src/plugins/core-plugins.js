"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCorePlugins = exports.fetchCorePlugins = void 0;
const chalk_1 = require("chalk");
const output_1 = require("../utils/output");
function fetchCorePlugins() {
    const corePlugins = [
        {
            name: '@sinbix/core',
            capabilities: 'builders,schematics',
        },
    ];
    return corePlugins;
}
exports.fetchCorePlugins = fetchCorePlugins;
function listCorePlugins(installedPlugins, corePlugins) {
    const installedPluginsMap = new Set(installedPlugins.map((p) => p.name));
    const alsoAvailable = corePlugins.filter((p) => !installedPluginsMap.has(p.name));
    if (alsoAvailable.length) {
        output_1.output.log({
            title: `Also available:`,
            bodyLines: alsoAvailable.map((p) => {
                return `${chalk_1.default.bold(p.name)} (${p.capabilities})`;
            }),
        });
    }
}
exports.listCorePlugins = listCorePlugins;
//# sourceMappingURL=core-plugins.js.map