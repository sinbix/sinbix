"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecorder = void 0;
const core_1 = require("@angular-devkit/core");
const chalk_1 = require("chalk");
function createRecorder(record, logger) {
    return (event) => {
        const eventPath = event.path.startsWith('/')
            ? event.path.substr(1)
            : event.path;
        if (event.kind === 'error') {
            record.error = true;
            logger.warn(`ERROR! ${eventPath} ${event.description == 'alreadyExist'
                ? 'already exists'
                : 'does not exist.'}.`);
        }
        else if (event.kind === 'update') {
            record.loggingQueue.push(core_1.tags.oneLine `${chalk_1.default.white('UPDATE')} ${eventPath} (${event.content.length} bytes)`);
        }
        else if (event.kind === 'create') {
            record.loggingQueue.push(core_1.tags.oneLine `${chalk_1.default.green('CREATE')} ${eventPath} (${event.content.length} bytes)`);
        }
        else if (event.kind === 'delete') {
            record.loggingQueue.push(`${chalk_1.default.yellow('DELETE')} ${eventPath}`);
        }
        else if (event.kind === 'rename') {
            record.loggingQueue.push(`${chalk_1.default.blue('RENAME')} ${eventPath} => ${event.to}`);
        }
    };
}
exports.createRecorder = createRecorder;
//# sourceMappingURL=create-recorder.js.map