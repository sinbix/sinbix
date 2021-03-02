import * as _ from 'lodash';
import { getPackageManagerExecuteCommand } from '@sinbix/core/src/utils/detect-package-manager';
import { exec } from 'child_process';
import { tmpProjPath } from './paths';

export function runSinbixCommandAsync(
  project: string,
  command: string,
  silent = false,
): Promise<{stdout: string, stderr: string}> {
  return new Promise((resolve, reject) => {
    exec(
      `${getPackageManagerExecuteCommand()} sinbix ${command}`,
      {
        cwd: tmpProjPath({ project }),
      },
      (err, stdout, stderr) => {
        if (!silent && err) {
          reject(err);
        }
        resolve({ stdout, stderr });
      }
    );
  });
}
