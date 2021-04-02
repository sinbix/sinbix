import { JsonObject } from '@angular-devkit/core';
import { InspectType } from '../../../utils';

export interface ExecuteBuilderOptions extends JsonObject {
  inspect: boolean | InspectType;
  runtimeArgs: string[];
  args: string[];
  waitUntilTargets: string[];
  buildTarget: string;
  host: string;
  port: number;
  watch: boolean;
}
