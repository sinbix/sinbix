"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOptions = void 0;
const minimist = require("minimist");
const utils_1 = require("../../../utils");
function parseOptions(args) {
    const schematicOptions = utils_1.convertToCamelCase(minimist(args, {
        boolean: ['help', 'dryRun', 'debug', 'force', 'interactive'],
        alias: {
            dryRun: 'dry-run',
            d: 'dryRun',
        },
        default: {
            debug: false,
            dryRun: false,
            interactive: true,
        },
    }));
    const res = {
        schematicOptions,
        help: schematicOptions.help,
        debug: schematicOptions.debug,
        dryRun: schematicOptions.dryRun,
        force: schematicOptions.force,
        interactive: schematicOptions.interactive,
        defaults: schematicOptions.defaults,
    };
    delete schematicOptions.debug;
    delete schematicOptions.d;
    delete schematicOptions.dryRun;
    delete schematicOptions.force;
    delete schematicOptions.interactive;
    delete schematicOptions.defaults;
    delete schematicOptions.help;
    delete schematicOptions['--'];
    return res;
}
exports.parseOptions = parseOptions;
//# sourceMappingURL=parse-options.js.map