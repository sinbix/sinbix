"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCommand = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular-devkit/core");
const node_1 = require("@angular-devkit/core/node");
const utils_1 = require("./utils");
const utils_2 = require("../../utils");
function newCommand(root, args, flags) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const sinbixArgs = ['--preset="empty"', `--sinbixWorkspaceRoot="${root}"`];
        sinbixArgs.push(...args);
        const parsedOptions = utils_1.parseOptions(sinbixArgs);
        const logger = utils_2.getLogger(flags);
        return utils_2.handleErrors(logger, flags, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fsHost = new core_1.virtualFs.ScopedHost(new node_1.NodeJsSyncHost(), core_1.normalize(root));
            const workflow = yield utils_1.createWorkflow(fsHost, root, parsedOptions);
            return utils_1.executeSchematic(parsedOptions, workflow, logger);
        }));
    });
}
exports.newCommand = newCommand;
//# sourceMappingURL=command.js.map