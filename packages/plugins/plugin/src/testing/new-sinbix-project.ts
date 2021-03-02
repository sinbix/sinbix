import { execSync } from 'child_process';
import { cleanup } from './common';

export async function newSinbixProject(
  project: string,
  args?: string,
  silent = false
) {
  cleanup(project);
  await runSinbixNewCommand(project, args, silent);
}

async function runSinbixNewCommand(
  project: string,
  args?: string,
  silent = false
) {
  const localTmpDir = 'tmp/e2e';

  return execSync(
    `npx sinbix new ${project} --no-interactive --skip-install --npmScope=${project} ${
      args || ''
    }`,
    {
      cwd: localTmpDir,
      ...(silent && false ? { stdio: ['ignore', 'ignore', 'ignore'] } : {}),
    }
  );
}
