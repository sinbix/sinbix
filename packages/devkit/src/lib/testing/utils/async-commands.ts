import { exec } from 'child_process';
import { tmpProjPath } from './paths';
import { getPackageManagerExecuteCommand } from '@nrwl/workspace/src/utils/detect-package-manager';

export function runCommandAsync(
  command: string,
  projectName = 'proj',
  opts = {
    silenceError: false,
  }
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(
      command,
      {
        cwd: tmpProjPath(projectName),
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

export function runSinbixCommandAsync(
  command: string,
  projectName = 'proj',
  opts = {
    silenceError: false,
  }
): Promise<{ stdout: string; stderr: string }> {
  return runCommandAsync(
    `${getPackageManagerExecuteCommand()} sinbix ${command}`,
    projectName,
    opts
  );
}
