"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBuilder = void 0;
const tslib_1 = require("tslib");
const architect_1 = require("@angular-devkit/architect");
const rxjs_1 = require("rxjs");
const core_1 = require("@angular-devkit/core");
const node_1 = require("@angular-devkit/core/node");
const project_graph_1 = require("@sinbix/core/project-graph");
const path_1 = require("path");
const operators_1 = require("rxjs/operators");
const build_webpack_1 = require("@angular-devkit/build-webpack");
const utils_1 = require("./utils");
function runBuilder(options, context) {
    const projGraph = project_graph_1.createProjectGraph();
    // if (!options.buildLibsFromSource) {
    //   const { target, dependencies } = calculateProjectDependencies(
    //     projGraph,
    //     context
    //   );
    //   options.tsConfig = createTmpTsConfig(
    //     join(context.workspaceRoot, options.tsConfig),
    //     context.workspaceRoot,
    //     target.data.root,
    //     dependencies
    //   );
    // }
    return rxjs_1.from(getRoots(context)).pipe(operators_1.map(({ sourceRoot, projectRoot }) => utils_1.normalizeOptions(options, context.workspaceRoot, sourceRoot, projectRoot)), operators_1.tap((normalizedOptions) => {
        if (normalizedOptions.generatePackageJson) {
            utils_1.generatePackageJson(context.target.project, projGraph, normalizedOptions);
        }
    }), operators_1.map((options) => {
        let config = utils_1.getNodeWebpackConfig(options);
        if (options.webpackConfig) {
            config = require(options.webpackConfig)(config, {
                options,
                configuration: context.target.configuration,
            });
        }
        return config;
    }), operators_1.concatMap((config) => 
    //@ts-ignore
    build_webpack_1.runWebpack(config, context, {
        logging: (stats) => {
            context.logger.info(stats.toString(config.stats));
        },
        webpackFactory: require('webpack'),
    })), operators_1.map((buildEvent) => {
        buildEvent.outfile = path_1.resolve(context.workspaceRoot, options.outputPath, utils_1.OUT_FILENAME);
        return buildEvent;
    }));
}
exports.runBuilder = runBuilder;
//@ts-ignore
exports.default = architect_1.createBuilder(runBuilder);
function getRoots(context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const workspaceHost = core_1.workspaces.createWorkspaceHost(new node_1.NodeJsSyncHost());
        const { workspace } = yield core_1.workspaces.readWorkspace(context.workspaceRoot, workspaceHost);
        const project = workspace.projects.get(context.target.project);
        if (project.sourceRoot && project.root) {
            return { sourceRoot: project.sourceRoot, projectRoot: project.root };
        }
        else {
            context.reportStatus('Error');
            const message = `${context.target.project} does not have a sourceRoot or root. Please define one.`;
            context.logger.error(message);
            throw new Error(message);
        }
    });
}
//# sourceMappingURL=builder.js.map