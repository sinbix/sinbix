import { Options } from "../../../utils";
export interface GenerateOptions {
    collectionName: string;
    schematicName: string;
    schematicOptions: Options;
    help: boolean;
    debug: boolean;
    dryRun: boolean;
    force: boolean;
    interactive: boolean;
    defaults: boolean;
}
