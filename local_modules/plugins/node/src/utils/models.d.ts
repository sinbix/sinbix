import { BuildResult } from '@angular-devkit/build-webpack';
export declare const enum InspectType {
    Inspect = "inspect",
    InspectBrk = "inspect-brk"
}
export declare type FileInputOutput = {
    input: string;
    output: string;
};
export declare type NodeBuildEvent = BuildResult & {
    outfile: string;
};
