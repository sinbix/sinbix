export declare function runSinbixCommandAsync(project: string, command: string, silent?: boolean): Promise<{
    stdout: string;
    stderr: string;
}>;
export declare function runSinbixCommand(project: string, command: string, silent?: boolean): string;
