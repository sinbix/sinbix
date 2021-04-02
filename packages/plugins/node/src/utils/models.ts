import { BuildResult } from '@angular-devkit/build-webpack';

export const enum InspectType {
  Inspect = 'inspect',
  InspectBrk = 'inspect-brk',
}

export type FileInputOutput = {
  input: string;
  output: string;
};

export type NodeBuildEvent = BuildResult & {
  outfile: string;
};
