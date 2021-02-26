import * as _ from 'lodash';
import { invokeCommand, LoggerFlags } from '@sinbix/cli';
import { tmpProjPath } from './paths';
import { setDefaultValues } from "@sinbix-common/utils";

export function runSinbixCommandAsync(
  project: string,
  command: string,
  flags?: LoggerFlags
): Promise<void> {
  flags = setDefaultValues(flags, {
    silent: true
  })

  const [commandName, ...commandArgs] = command.split(' ');

  return invokeCommand(commandName, tmpProjPath({ project }), [
    ...commandArgs,
    flags?.verbose ? '--verbose' : '',
    flags?.silent ? '--silent' : ''
  ]);
}
