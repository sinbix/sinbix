import { exec, fork } from 'child_process';
import { setDefaultValues } from '@sinbix-common/utils';
import { tmpProjPath } from './paths';
import { RunCommandAsyncOptions, RunSinbixCommandAsyncOptions } from '../types';
import { getPackageManagerExecuteCommand } from '@sinbix/core/src/utils/detect-package-manager';
import { invokeCommand } from "@sinbix/cli";

export function runCommandAsync(
  options: RunCommandAsyncOptions
): Promise<void> {
  options = setDefaultValues(options, {
    silenceError: false,
  });
  const { command, project, silenceError } = options;
  const [commandName, ...commandArgs] = command.split(' ');

  return invokeCommand(commandName, tmpProjPath({project}), commandArgs)
}

// export function runSinbixCommandAsync(
//   options: RunSinbixCommandAsyncOptions
// ): Promise<{ stdout: string; stderr: string }> {
//   options = setDefaultValues(options, {
//     silenceError: false,
//   });
//   const { command, project, silenceError } = options;
//   const opts = {
//     command: `${getPackageManagerExecuteCommand()} sinbix ${command}`,
//     project,
//     silenceError,
//   };
//   return runCommandAsync(opts);
// }

export function runSinbixCommandAsync(
  options: RunSinbixCommandAsyncOptions
): Promise<void> {
  options = setDefaultValues(options, {
    silenceError: false,
  });
  const { command, project, silenceError } = options;
  const opts = {
    command,
    project,
    silenceError,
  };
  // return runCommandAsync(opts);
  return runCommandAsync(opts);
}
