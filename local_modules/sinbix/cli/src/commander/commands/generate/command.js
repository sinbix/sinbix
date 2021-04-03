"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommand = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular-devkit/core");
const node_1 = require("@angular-devkit/core/node");
const utils_1 = require("../../utils");
const utils_2 = require("./utils");
function generateCommand(root, args, flags) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const logger = utils_1.getLogger(flags);
        return utils_1.handleErrors(logger, flags, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fsHost = new core_1.virtualFs.ScopedHost(new node_1.NodeJsSyncHost(), core_1.normalize(root));
            const opts = utils_2.parseOptions(args, yield utils_2.readDefaultCollection(fsHost));
            const workflow = yield utils_2.createWorkflow(fsHost, root, opts);
            const collection = utils_2.getCollection(workflow, opts.collectionName);
            const schematic = collection.createSchematic(opts.schematicName, true);
            return utils_2.runSchematic(root, workflow, logger, Object.assign(Object.assign({}, opts), { schematicName: schematic.description.name }), schematic);
        }));
    });
}
exports.generateCommand = generateCommand;
//# sourceMappingURL=command.js.map