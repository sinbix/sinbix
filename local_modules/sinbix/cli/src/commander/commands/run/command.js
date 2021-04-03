"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommand = void 0;
const tslib_1 = require("tslib");
const architect_1 = require("@angular-devkit/architect");
const node_1 = require("@angular-devkit/architect/node");
const core_1 = require("@angular-devkit/core");
const node_2 = require("@angular-devkit/core/node");
const utils_1 = require("../../utils");
const utils_2 = require("./utils");
function runCommand(root, args, flags) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const logger = utils_1.getLogger(flags);
        return utils_1.handleErrors(logger, flags, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fsHost = new node_2.NodeJsSyncHost();
            const { workspace } = yield core_1.workspaces.readWorkspace('angular.json', core_1.workspaces.createWorkspaceHost(fsHost));
            const opts = utils_2.parseRunOpts(args, workspace.extensions['defaultProject'], logger);
            utils_2.validate(workspace, opts);
            const registry = new core_1.json.schema.CoreSchemaRegistry();
            registry.addPostTransform(core_1.schema.transforms.addUndefinedDefaults);
            const architectHost = new node_1.WorkspaceNodeModulesArchitectHost(workspace, root);
            const architect = new architect_1.Architect(architectHost, registry);
            const builderConf = yield architectHost.getBuilderNameForTarget({
                project: opts.project,
                target: opts.target,
            });
            const builderDesc = yield architectHost.resolveBuilder(builderConf);
            const flattenedSchema = yield registry
                .flatten(builderDesc.optionSchema)
                .toPromise();
            if (opts.help) {
                utils_2.printRunHelp(opts, flattenedSchema, logger);
                return 0;
            }
            const runOptions = normalizeOptions(opts.runOptions, flattenedSchema);
            const run = yield architect.scheduleTarget({
                project: opts.project,
                target: opts.target,
                configuration: opts.configuration,
            }, runOptions, { logger });
            const result = yield run.output.toPromise();
            yield run.stop();
            return result.success ? 0 : 1;
        }));
    });
}
exports.runCommand = runCommand;
function normalizeOptions(opts, schema) {
    return utils_1.convertAliases(utils_1.coerceTypes(opts, schema), schema, false);
}
//# sourceMappingURL=command.js.map