import { ESLint } from 'eslint';
import { LintBuilderOptions } from './models';
export declare function loadESLint(): Promise<any>;
export declare function lint(eslintConfigPath: string | undefined, options: LintBuilderOptions, workspaceRoot: string): Promise<ESLint.LintResult[]>;
