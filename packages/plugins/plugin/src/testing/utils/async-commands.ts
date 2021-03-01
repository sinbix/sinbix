import * as _ from 'lodash';
import { LoggerFlags } from '@sinbix/cli';
import { getPackageManagerExecuteCommand } from '@sinbix/core/src/utils/detect-package-manager';
import { exec } from 'child_process';
import { tmpProjPath } from './paths';

export function runSinbixCommandAsync(
  project: string,
  command: string,
  flags?: LoggerFlags
): Promise<{stdout: string, stderr: string}> {
  return new Promise((resolve, reject) => {
    exec(
      `${getPackageManagerExecuteCommand()} sinbix ${command}`,
      {
        cwd: tmpProjPath({ project }),
      },
      (err, stdout, stderr) => {
        if (!flags?.silent && err) {
          reject(err);
        }
        resolve({ stdout, stderr });
      }
    );
  });
}
