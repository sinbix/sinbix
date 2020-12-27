export function tmpProjPath(projectName: string, path?: string) {
  return path
    ? `${process.cwd()}/tmp/sinbix-e2e/${projectName}/${path}`
    : `${process.cwd()}/tmp/sinbix-e2e/${projectName}`;
}

// export function tmpBackupProjPath(path?: string) {
//
//   return path
//     ? `${process.cwd()}/tmp/sinbix-e2e/proj-backup/${path}`
//     : `${process.cwd()}/tmp/sinbix-e2e/proj-backup`;
// }
