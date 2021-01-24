import { JsonObject } from '@angular-devkit/core';

export interface CommandsBuilderSchema extends JsonObject {
  command: string;
  commands: (
    | {
        command: string;
        forwardAllArgs?: boolean;
      }
    | string
  )[];
  color?: boolean;
  parallel?: boolean;
  readyWhen?: string;
  cwd?: string;
  args?: string;
  envFile?: string;
  outputPath?: string;
}
