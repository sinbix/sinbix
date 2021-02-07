import { chain, Rule } from '@angular-devkit/schematics';
import {
  MoveSchematicOptions,
  normalizeOptions,
  checkDestination,
  runMover,
} from './utils';
import { checkProjectExists } from '@sinbix/utils';

export default function (options: MoveSchematicOptions): Rule {
  const normalizedOptions = normalizeOptions(options);
  return chain([
    checkProjectExists(normalizedOptions),
    checkDestination(normalizedOptions),
    runMover(normalizedOptions),
  ]);
}
