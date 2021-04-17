"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPluginCapabilities = exports.getPluginCapabilities = void 0;
const chalk_1 = require("chalk");
const app_root_1 = require("../utils/app-root");
const detect_package_manager_1 = require("../utils/detect-package-manager");
const fileutils_1 = require("../utils/fileutils");
const output_1 = require("../utils/output");
const shared_1 = require("./shared");
function tryGetCollection(workspaceRoot, pluginName, jsonFile, propName) {
    if (!jsonFile) {
        return null;
    }
    try {
        const jsonFilePath = require.resolve(`${pluginName}/${jsonFile}`, {
            paths: [workspaceRoot],
        });
        return fileutils_1.readJsonFile(jsonFilePath)[propName];
    }
    catch (_a) {
        return null;
    }
}
function getPluginCapabilities(workspaceRoot, pluginName) {
    try {
        const packageJsonPath = require.resolve(`${pluginName}/package.json`, {
            paths: [workspaceRoot],
        });
        const packageJson = fileutils_1.readJsonFile(packageJsonPath);
        return {
            name: pluginName,
            schematics: tryGetCollection(workspaceRoot, pluginName, packageJson.schematics, 'schematics'),
            builders: tryGetCollection(workspaceRoot, pluginName, packageJson.builders, 'builders'),
        };
    }
    catch (_a) {
        return null;
    }
}
exports.getPluginCapabilities = getPluginCapabilities;
function listPluginCapabilities(pluginName) {
    const plugin = getPluginCapabilities(app_root_1.appRootPath, pluginName);
    if (!plugin) {
        const packageManager = detect_package_manager_1.detectPackageManager();
        output_1.output.note({
            title: `${pluginName} is not currently installed`,
            bodyLines: [
                `Use "${detect_package_manager_1.getPackageManagerInstallCommand(packageManager, true)} ${pluginName}" to add new capabilities`,
            ],
        });
        return;
    }
    const hasBuilders = shared_1.hasElements(plugin.builders);
    const hasSchematics = shared_1.hasElements(plugin.schematics);
    if (!hasBuilders && !hasSchematics) {
        output_1.output.warn({ title: `No capabilities found in ${pluginName}` });
        return;
    }
    const bodyLines = [];
    if (hasSchematics) {
        bodyLines.push(chalk_1.default.bold(chalk_1.default.green('SCHEMATICS')));
        bodyLines.push('');
        bodyLines.push(...Object.keys(plugin.schematics).map((name) => `${chalk_1.default.bold(name)} : ${plugin.schematics[name].description}`));
        if (hasBuilders) {
            bodyLines.push('');
        }
    }
    if (hasBuilders) {
        bodyLines.push(chalk_1.default.bold(chalk_1.default.green('BUILDERS')));
        bodyLines.push('');
        bodyLines.push(...Object.keys(plugin.builders).map((name) => `${chalk_1.default.bold(name)} : ${plugin.builders[name].description}`));
    }
    output_1.output.log({
        title: `Capabilities in ${plugin.name}:`,
        bodyLines,
    });
}
exports.listPluginCapabilities = listPluginCapabilities;
//# sourceMappingURL=plugin-capabilities.js.map