import { execSync } from 'child_process';
import { tmpProjPath } from './paths';
import { getPackageManagerExecuteCommand } from '@nrwl/workspace/src/utils/detect-package-manager';

export function runSinbixCommand(
  command?: string,
  projectName = 'proj',
  opts = {
    silenceError: false,
  },
): string {
  try {
    return execSync(`${getPackageManagerExecuteCommand()} sinbix ${command}`, {
      cwd: tmpProjPath(projectName),
    })
      .toString()
      .replace(
        // eslint-disable-next-line no-control-regex
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
        ''
      );
  } catch (e) {
    if (opts.silenceError) {
      return e.stdout.toString();
    } else {
      console.log(e.stdout.toString(), e.stderr.toString());
      throw e;
    }
  }
}

export function runCommand(command: string, projectName = 'proj'): string {
  try {
    return execSync(command, {
      cwd: tmpProjPath(projectName),
      stdio: ['pipe', 'pipe', 'pipe'],
    }).toString();
  } catch (e) {
    return e.stdout.toString() + e.stderr.toString();
  }
}
