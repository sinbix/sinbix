import { exec, execSync } from 'child_process';
import { tmpProjPath } from './paths';
import { getPackageManagerExecuteCommand } from '@sinbix/core/src/utils/detect-package-manager';

export function runSinbixCommandAsync(
  project: string,
  command: string,
  silent = false
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(
      `${getPackageManagerExecuteCommand()} sinbix ${command}`,
      {
        cwd: tmpProjPath(project),
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

export function runSinbixCommand(
  project: string,
  command: string,
  silent = false
): string {
  try {
    return execSync(`${getPackageManagerExecuteCommand()} sinbix ${command}`, {
      cwd: tmpProjPath(project),
    })
      .toString()
      .replace(
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
        ''
      );
  } catch (e) {
    if (silent) {
      return e.stdout.toString();
    } else {
      console.log(e.stdout.toString(), e.stderr.toString());
      throw e;
    }
  }
}
