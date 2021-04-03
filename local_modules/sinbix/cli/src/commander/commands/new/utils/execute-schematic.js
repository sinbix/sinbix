"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeSchematic = void 0;
const tslib_1 = require("tslib");
const path_1 = require("path");
const utils_1 = require("../../generate/utils");
function executeSchematic(options, workflow, logger) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const record = { loggingQueue: [], error: false };
        workflow.reporter.subscribe(utils_1.createRecorder(record, logger));
        yield workflow
            .execute({
            collection: path_1.join(require.resolve('@sinbix/common'), '../../collection.json'),
            schematic: 'new',
            options: options.schematicOptions,
            logger: logger,
        })
            .toPromise();
        if (!record.error) {
            record.loggingQueue.forEach((log) => logger.info(log));
        }
        if (options.dryRun) {
            logger.warn(`\nNOTE: The "dryRun" flag means no changes were made.`);
        }
    });
}
exports.executeSchematic = executeSchematic;
//# sourceMappingURL=execute-schematic.js.map