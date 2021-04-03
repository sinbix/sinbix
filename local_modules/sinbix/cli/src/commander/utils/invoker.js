"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeCommand = exports.invokeCli = void 0;
const tslib_1 = require("tslib");
function invokeCli(root, args) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const [command, ...commandArgs] = args;
        process.exit(yield invokeCommand(command, root, commandArgs));
    });
}
exports.invokeCli = invokeCli;
function invokeCommand(command, root, commandArgs = []) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (command === undefined) {
            command = 'help';
        }
        function getFlag(...flags) {
            for (const flag of flags) {
                const flagIndex = commandArgs.indexOf(flag);
                if (flagIndex >= 0) {
                    commandArgs.splice(flagIndex, 1);
                    return true;
                }
            }
            return false;
        }
        const flags = {
            verbose: getFlag('--verbose', '-v'),
        };
        switch (command) {
            case 'new':
                return (yield Promise.resolve().then(() => require('../commands/new'))).newCommand(root, commandArgs, flags);
            case 'generate':
            case 'g':
                return (yield Promise.resolve().then(() => require('../commands/generate'))).generateCommand(root, commandArgs, flags);
            case 'run':
            case 'r':
                return (yield Promise.resolve().then(() => require('../commands/run'))).runCommand(root, commandArgs, flags);
            case 'migrate':
                return (yield Promise.resolve().then(() => require('../commands/migrate'))).migrate(root, commandArgs, flags.verbose);
            case 'help':
            case '--help':
                return (yield Promise.resolve().then(() => require('../commands/help'))).help();
            default: {
                const projectNameIncluded = commandArgs[0] && !commandArgs[0].startsWith('-');
                const projectName = projectNameIncluded ? commandArgs[0] : '';
                // this is to make `tao test mylib` same as `tao run mylib:test`
                return (yield Promise.resolve().then(() => require('../commands/run'))).runCommand(root, [
                    `${projectName}:${command}`,
                    ...(projectNameIncluded ? commandArgs.slice(1) : commandArgs),
                ], flags);
            }
        }
    });
}
exports.invokeCommand = invokeCommand;
//# sourceMappingURL=invoker.js.map