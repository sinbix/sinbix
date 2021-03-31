import { logging } from '@angular-devkit/core';
import chalk from 'chalk';
import * as minimist from 'minimist';
import { commandName, convertToCamelCase } from '../../../utils';
import { RunOptions } from './models';

export function parseRunOpts(
  args: string[],
  defaultProjectName: string | null,
  logger: logging.Logger
): RunOptions {
  const runOptions = convertToCamelCase(
    minimist(args, {
      boolean: ['help', 'prod'],
      string: ['configuration', 'project'],
    })
  );
  const help = runOptions.help as boolean;
  if (!runOptions._ || !runOptions._[0]) {
    throwInvalidInvocation();
  }

  let [project, target, configuration]: [
    string,
    string,
    string
  ] = runOptions._[0].split(':');

  if (!project && defaultProjectName) {
    logger.debug(
      `No project name specified. Using default project : ${chalk.bold(
        defaultProjectName
      )}`
    );
    project = defaultProjectName;
  }
  if (runOptions.configuration) {
    configuration = runOptions.configuration as string;
  }
  if (runOptions.prod) {
    configuration = 'production';
  }
  if (runOptions.project) {
    project = runOptions.project as string;
  }
  if (!project || !target) {
    throwInvalidInvocation();
  }
  const res = { project, target, configuration, help, runOptions };
  delete runOptions['help'];
  delete runOptions['_'];
  delete runOptions['configuration'];
  delete runOptions['prod'];
  delete runOptions['project'];

  return res;
}

function throwInvalidInvocation() {
  throw new Error(
    `Specify the project name and the target (e.g., ${commandName} run proj:build)`
  );
}
