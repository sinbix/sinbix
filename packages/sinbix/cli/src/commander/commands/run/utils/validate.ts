import { terminal } from '@angular-devkit/core';
import { WorkspaceDefinition } from '@angular-devkit/core/src/workspace';
import { RunOptions } from './models';

export function validate(workspace: WorkspaceDefinition, opts: RunOptions) {
  const architect = workspace.projects.get(opts.project);

  // workspace.projects.forEach((value) => {
  //   console.log(JSON.stringify(value, null, 2));
  // });

  if (!architect) {
    throw new Error(`Could not find project "${opts.project}"`);
  }
  const targets = architect.targets;

  const availableTargets = [...targets.keys()];
  const target = targets.get(opts.target);
  if (!target) {
    throw new Error(
      `Could not find target "${opts.target}" in the ${
        opts.project
      } project. Valid targets are: ${terminal.bold(
        availableTargets.join(', ')
      )}`
    );
  }

  // Not all targets have configurations
  // and an undefined configuration is valid
  if (opts.configuration) {
    if (target.configurations) {
      const configuration = target.configurations[opts.configuration];
      if (!configuration) {
        throw new Error(
          `Could not find configuration "${opts.configuration}" in ${
            opts.project
          }:${opts.target}. Valid configurations are: ${Object.keys(
            target.configurations
          ).join(', ')}`
        );
      }
    } else {
      throw new Error(
        `No configurations are defined for ${opts.project}:${opts.target}, so "${opts.configuration}" is invalid.`
      );
    }
  }
}
