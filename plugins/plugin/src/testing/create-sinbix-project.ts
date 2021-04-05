import { tmpProjPath } from './paths';
import { ensureDirSync } from 'fs-extra';
import { newSinbixProject } from './new-sinbix-project';

export async function ensureSinbixProject(
  project: string,
  args?: string,
  silent = false
) {
  ensureDirSync(tmpProjPath(project));
  await newSinbixProject(project, args, silent);
}
