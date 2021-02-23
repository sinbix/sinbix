import { Options } from '../../../utils';

export interface NewOptions {
  schematicOptions: Options;
  help: boolean;
  debug: boolean;
  dryRun: boolean;
  force: boolean;
  interactive: boolean;
  defaults: boolean;
}
