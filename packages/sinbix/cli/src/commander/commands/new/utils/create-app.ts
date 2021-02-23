import { getLogger } from '@sinbix/cli';
import { createWorkflow } from './create-workflow';
import { executeSchematic } from './execute-schematic';

export function createApp(
  tmpDir: string,
  args: string[],
  root = process.cwd(),
  isVerbose = false
) {
  const logger = getLogger(isVerbose);
  const workflow = createWorkflow(root);
  return executeSchematic('new', args, workflow, logger);
}
