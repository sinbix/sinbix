import { Options } from "../../../utils";

export interface RunOptions {
    project: string;
    target: string;
    configuration: string;
    help: boolean;
    runOptions: Options;
  }