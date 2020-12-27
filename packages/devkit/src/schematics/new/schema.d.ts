export interface NewSchematicSchema {
  directory: string;
  name: string;
  appName: string;
  npmScope?: string;
  skipInstall?: boolean;
  skipGit?: boolean;
  style?: string;
  nxCloud?: boolean;
  preset:
    | 'empty'
    | 'oss'
    | 'angular'
    | 'react'
    | 'web-components'
    | 'angular-nest'
    | 'react-express'
    | 'next'
    | 'nest';
  commit?: { name: string; email: string; message?: string };
  defaultBase?: string;
  nxWorkspaceRoot?: string;
  linter: 'tslint' | 'eslint';
  packageManager?: string;
}
