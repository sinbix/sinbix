import { exec } from 'child_process';
import { setDefaultValues } from '@sinbix/common';
import { tmpProjPath } from './paths';
import { RunCommandAsyncOptions, RunSinbixCommandAsyncOptions } from '../types';
import { getPackageManagerExecuteCommand } from '@sinbix/core/src/utils/detect-package-manager';

export function runCommandAsync(
  options: RunCommandAsyncOptions
): Promise<{ stdout: string; stderr: string }> {
  options = setDefaultValues(options, {
    silenceError: false,
  });
  const { command, project, silenceError } = options;
  return new Promise((resolve, reject) => {
    exec(
      command,
      {
        cwd: tmpProjPath({ project }),
      },
      (err, stdout, stderr) => {
        if (!silenceError && err) {
          reject(err);
        }
        resolve({ stdout, stderr });
      }
    );
  });
}

export function runSinbixCommandAsync(
  options: RunSinbixCommandAsyncOptions
): Promise<{ stdout: string; stderr: string }> {
  options = setDefaultValues(options, {
    silenceError: false,
  });
  const { command, project, silenceError } = options;
  const opts = {
    command: `${getPackageManagerExecuteCommand()} sinbix ${command}`,
    project,
    silenceError,
  };
  return runCommandAsync(opts);
}
