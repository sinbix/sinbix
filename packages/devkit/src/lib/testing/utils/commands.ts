import { execSync } from 'child_process';
import { tmpProjPath } from './paths';
import { RunCommandOptions, RunSinbixCommandOptions } from '../types';
import { setDefaultValues } from '@sinbix/common';
import { getPackageManagerExecuteCommand } from "../../../workspace/utils/detect-package-manager";

export function runSinbixCommand(options: RunSinbixCommandOptions): string {
  setDefaultValues(options, {
    silenceError: false,
  });
  const { command, project, silenceError } = options;
  try {
    return execSync(`${getPackageManagerExecuteCommand()} sinbix ${command}`, {
      cwd: tmpProjPath({ project }),
    })
      .toString()
      .replace(
        // eslint-disable-next-line no-control-regex
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
        ''
      );
  } catch (e) {
    if (silenceError) {
      return e.stdout.toString();
    } else {
      console.log(e.stdout.toString(), e.stderr.toString());
      throw e;
    }
  }
}

export function runCommand(options: RunCommandOptions): string {
  const { command, project } = options;
  try {
    return execSync(command, {
      cwd: tmpProjPath({ project }),
      stdio: ['pipe', 'pipe', 'pipe'],
    }).toString();
  } catch (e) {
    return e.stdout.toString() + e.stderr.toString();
  }
}
