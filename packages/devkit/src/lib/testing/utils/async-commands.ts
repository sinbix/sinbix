import { exec } from 'child_process';
import { tmpProjPath } from './paths';
import { getPackageManagerExecuteCommand } from '@nrwl/workspace/src/utils/detect-package-manager';

/**
 * Run a command asynchronously inside the e2e directory.
 *
 * @param command
 * @param opts
 */
export function runCommandAsync(
  command: string,
  opts = {
    silenceError: false,
  }
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(
      command,
      {
        cwd: tmpProjPath(),
      },
      (err, stdout, stderr) => {
        if (!opts.silenceError && err) {
          reject(err);
        }
        resolve({ stdout, stderr });
      }
    );
  });
}

/**
 * Run a sinbix command asynchronously inside the e2e directory
 * @param command
 * @param opts
 */
export function runSinbixCommandAsync(
  command: string,
  opts = {
    silenceError: false,
  }
): Promise<{ stdout: string; stderr: string }> {
  return runCommandAsync(
    `${getPackageManagerExecuteCommand()} sinbix ${command}`,
    opts
  );
}
