"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSchematic = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("../../../utils");
const print_gen_help_1 = require("./print-gen-help");
const create_recorder_1 = require("./create-recorder");
function runSchematic(root, workflow, logger, opts, schematic, allowAdditionalArgs = false) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const flattenedSchema = (yield workflow.registry
            .flatten(schematic.description.schemaJson)
            .toPromise());
        if (opts.help) {
            print_gen_help_1.printGenHelp(opts, flattenedSchema, logger);
            return 0;
        }
        // const defaults = await getSchematicDefaults(
        //         root,
        //         opts.collectionName,
        //         opts.schematicName
        //       );
        const defaults = {};
        const record = { loggingQueue: [], error: false };
        workflow.reporter.subscribe(create_recorder_1.createRecorder(record, logger));
        const schematicOptions = normalizeOptions(opts.schematicOptions, flattenedSchema);
        if (schematicOptions['--'] && !allowAdditionalArgs) {
            schematicOptions['--'].forEach((unmatched) => {
                const message = `Could not match option '${unmatched.name}' to the ${opts.collectionName}:${opts.schematicName} schema.` +
                    (unmatched.possible.length > 0
                        ? ` Possible matches : ${unmatched.possible.join()}`
                        : '');
                logger.fatal(message);
            });
            return 1;
        }
        yield workflow
            .execute({
            collection: opts.collectionName,
            schematic: opts.schematicName,
            options: Object.assign(Object.assign({}, defaults), schematicOptions),
            debug: opts.debug,
            logger,
        })
            .toPromise();
        if (!record.error) {
            record.loggingQueue.forEach((log) => logger.info(log));
        }
        if (opts.dryRun) {
            logger.warn(`\nNOTE: The "dryRun" flag means no changes were made.`);
        }
        return 0;
    });
}
exports.runSchematic = runSchematic;
function normalizeOptions(opts, schema) {
    return utils_1.lookupUnmatched(utils_1.convertAliases(utils_1.coerceTypes(opts, schema), schema, true), schema);
}
// async function getSchematicDefaults(
//   root: string,
//   collection: string,
//   schematic: string
// ) {
//   const workspace = await new experimental.workspace.Workspace(
//     normalize(root) as Path,
//     new NodeJsSyncHost()
//   )
//     .loadWorkspaceFromHost('angular.json' as Path)
//     .toPromise();
//   let result = {};
//   if (workspace.getSchematics()) {
//     const schematicObject = workspace.getSchematics()[
//       `${collection}:${schematic}`
//     ];
//     if (schematicObject) {
//       result = { ...result, ...(schematicObject as {}) };
//     }
//     const collectionObject = workspace.getSchematics()[collection];
//     if (
//       typeof collectionObject == 'object' &&
//       !Array.isArray(collectionObject)
//     ) {
//       result = { ...result, ...(collectionObject[schematic] as {}) };
//     }
//   }
//   return result;
// }
//# sourceMappingURL=run-schematic.js.map