"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = exports.getLogger = void 0;
const tslib_1 = require("tslib");
const schematics_1 = require("@angular-devkit/schematics");
const node_1 = require("@angular-devkit/core/node");
const chalk_1 = require("chalk");
const getLogger = (flags) => {
    const SINBIX_PREFIX = `${chalk_1.default.cyan('>')} ${chalk_1.default.inverse(chalk_1.default.bold(chalk_1.default.cyan(' SINBIX ')))}`;
    const SINBIX_ERROR = chalk_1.default.inverse(chalk_1.default.bold(chalk_1.default.red(' ERROR ')));
    return node_1.createConsoleLogger(flags.verbose, process.stdout, process.stderr, {
        warn: (s) => chalk_1.default.bold(chalk_1.default.yellow(s)),
        error: (s) => {
            if (s.startsWith('SINBIX ')) {
                return `\n${SINBIX_ERROR} ${chalk_1.default.bold(chalk_1.default.red(s.substr(3)))}\n`;
            }
            return chalk_1.default.bold(chalk_1.default.red(s));
        },
        fatal: (s) => chalk_1.default.bold(chalk_1.default.red(s)),
        info: (s) => {
            if (s.startsWith('SINBIX ')) {
                return `\n${SINBIX_PREFIX} ${chalk_1.default.bold(s.substr(3))}\n`;
            }
            return chalk_1.default.white(s);
        },
    });
};
exports.getLogger = getLogger;
function handleErrors(logger, flags, fn) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            return yield fn();
        }
        catch (err) {
            if (err instanceof schematics_1.UnsuccessfulWorkflowExecution) {
                logger.fatal('The Schematic workflow failed. See above.');
            }
            else {
                logger.fatal(err.message);
            }
            if ((flags === null || flags === void 0 ? void 0 : flags.verbose) && err.stack) {
                logger.info(err.stack);
            }
            return 1;
        }
    });
}
exports.handleErrors = handleErrors;
//# sourceMappingURL=logger.js.map