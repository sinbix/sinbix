export function tmpProjPath(tmpProjectName: string, path?: string) {
  return path
    ? `${process.cwd()}/tmp/e2e/${tmpProjectName}/${path}`
    : `${process.cwd()}/tmp/e2e/${tmpProjectName}`;
}
