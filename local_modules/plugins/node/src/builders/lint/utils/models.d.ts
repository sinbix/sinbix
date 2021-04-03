export interface LintBuilderOptions {
    eslintConfig: string | null;
    lintFilePatterns: string[];
    format: Formatter;
    force: boolean;
    silent: boolean;
    fix: boolean;
    cache: boolean;
    outputFile: string | null;
    cacheLocation: string | null;
    maxWarnings: number;
    quiet: boolean;
    ignorePath: string | null;
}
declare type Formatter = 'stylish' | 'compact' | 'codeframe' | 'unix' | 'visualstudio' | 'table' | 'checkstyle' | 'html' | 'jslint-xml' | 'json' | 'json-with-metadata' | 'junit' | 'tap';
export {};
