export declare const packagesWeCareAbout: any[];
export declare const report: {
    command: string;
    describe: string;
    builder: (yargs: any) => any;
    handler: typeof reportHandler;
};
/**
 * Reports relevant version numbers for adding to an Sinbix issue report
 *
 * @remarks
 *
 * Must be run within an Sinbix workspace
 *
 */
declare function reportHandler(): void;
export {};
