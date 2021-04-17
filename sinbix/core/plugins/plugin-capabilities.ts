import chalk from 'chalk';
import { appRootPath } from '../utils/app-root';
import {
  detectPackageManager,
  getPackageManagerInstallCommand,
} from '../utils/detect-package-manager';
import { readJsonFile } from '../utils/fileutils';
import { output } from '../utils/output';
import { PluginCapabilities } from './models';
import { hasElements } from './shared';

function tryGetCollection<T>(
  workspaceRoot: string,
  pluginName: string,
  jsonFile: string,
  propName: string
): T {
  if (!jsonFile) {
    return null;
  }

  try {
    const jsonFilePath = require.resolve(`${pluginName}/${jsonFile}`, {
      paths: [workspaceRoot],
    });
    return readJsonFile<T>(jsonFilePath)[propName];
  } catch {
    return null;
  }
}

export function getPluginCapabilities(
  workspaceRoot: string,
  pluginName: string
): PluginCapabilities {
  try {
    const packageJsonPath = require.resolve(`${pluginName}/package.json`, {
      paths: [workspaceRoot],
    });
    const packageJson = readJsonFile(packageJsonPath);
    return {
      name: pluginName,
      schematics: tryGetCollection(
        workspaceRoot,
        pluginName,
        packageJson.schematics,
        'schematics'
      ),
      builders: tryGetCollection(
        workspaceRoot,
        pluginName,
        packageJson.builders,
        'builders'
      ),
    };
  } catch {
    return null;
  }
}

export function listPluginCapabilities(pluginName: string) {
  const plugin = getPluginCapabilities(appRootPath, pluginName);

  if (!plugin) {
    const packageManager = detectPackageManager();
    output.note({
      title: `${pluginName} is not currently installed`,
      bodyLines: [
        `Use "${getPackageManagerInstallCommand(
          packageManager,
          true
        )} ${pluginName}" to add new capabilities`,
      ],
    });

    return;
  }

  const hasBuilders = hasElements(plugin.builders);
  const hasSchematics = hasElements(plugin.schematics);

  if (!hasBuilders && !hasSchematics) {
    output.warn({ title: `No capabilities found in ${pluginName}` });
    return;
  }

  const bodyLines = [];

  if (hasSchematics) {
    bodyLines.push(chalk.bold(chalk.green('SCHEMATICS')));
    bodyLines.push('');
    bodyLines.push(
      ...Object.keys(plugin.schematics).map(
        (name) =>
          `${chalk.bold(name)} : ${plugin.schematics[name].description}`
      )
    );
    if (hasBuilders) {
      bodyLines.push('');
    }
  }

  if (hasBuilders) {
    bodyLines.push(chalk.bold(chalk.green('BUILDERS')));
    bodyLines.push('');
    bodyLines.push(
      ...Object.keys(plugin.builders).map(
        (name) =>
          `${chalk.bold(name)} : ${plugin.builders[name].description}`
      )
    );
  }

  output.log({
    title: `Capabilities in ${plugin.name}:`,
    bodyLines,
  });
}
