export interface NewSchematicOptions {
  directory: string;
  name: string;
  appName: string;
  npmScope?: string;
  skipInstall?: boolean;
  skipGit?: boolean;
  style?: string;
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
  sinbixWorkspaceRoot?: string;
  linter: 'tslint' | 'eslint';
  packageManager?: string;
}

export interface NormalizedOptions extends NewSchematicOptions {}
