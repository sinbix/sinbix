export interface CLIErrorMessageConfig {
    title: string;
    bodyLines?: string[];
    slug?: string;
}
export interface CLIWarnMessageConfig {
    title: string;
    bodyLines?: string[];
    slug?: string;
}
export interface CLILogMessageConfig {
    title: string;
    bodyLines?: string[];
}
export interface CLINoteMessageConfig {
    title: string;
    bodyLines?: string[];
}
export interface CLISuccessMessageConfig {
    title: string;
}
declare class CLIOutput {
    private readonly SINBIX_PREFIX;
    /**
     * Longer dash character which forms more of a continuous line when place side to side
     * with itself, unlike the standard dash character
     */
    private readonly VERTICAL_SEPARATOR;
    /**
     * Expose some color and other utility functions so that other parts of the codebase that need
     * more fine-grained control of message bodies are still using a centralized
     * implementation.
     */
    colors: {
        gray: import("chalk").Chalk & {
            supportsColor: import("chalk").ColorSupport;
        };
    };
    bold: import("chalk").Chalk & {
        supportsColor: import("chalk").ColorSupport;
    };
    underline: import("chalk").Chalk & {
        supportsColor: import("chalk").ColorSupport;
    };
    private writeToStdOut;
    private writeOutputTitle;
    private writeOptionalOutputBody;
    addNewline(): void;
    addVerticalSeparator(): void;
    error({ title, slug, bodyLines }: CLIErrorMessageConfig): void;
    warn({ title, slug, bodyLines }: CLIWarnMessageConfig): void;
    note({ title, bodyLines }: CLINoteMessageConfig): void;
    success({ title }: CLISuccessMessageConfig): void;
    logSingleLine(message: string): void;
    log({ title, bodyLines }: CLIWarnMessageConfig): void;
}
export declare const output: CLIOutput;
export {};
