import { TmpProjPathOptions } from '../types';

export function tmpProjPath(options: TmpProjPathOptions) {
  const { project, path } = options;
  return path
    ? `${process.cwd()}/tmp/e2e/${project}/${path}`
    : `${process.cwd()}/tmp/e2e/${project}`;
}
