"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBuilder = void 0;
const architect_1 = require("@angular-devkit/architect");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
const utils_1 = require("./utils");
const project_graph_1 = require("@sinbix/core/project-graph");
function runBuilder(options, context) {
    // const libRoot = getBuilderProjectData(context).root;
    // const normalizedOptions = normalizeOptions(options, context, libRoot);
    // const { target, dependencies } = calculateProjectDependencies(
    //   getProjectGraphFromHost(createBuilderHost(context)),
    //   context
    // );
    const projGraph = project_graph_1.createProjectGraph();
    const libRoot = projGraph.nodes[context.target.project].data.root;
    const normalizedOptions = utils_1.normalizeOptions(options, context, libRoot);
    const { target, dependencies } = plugin_utils_1.calculateProjectDependencies(projGraph, context);
    console.log(dependencies);
    return rxjs_1.of(plugin_utils_1.checkDependentProjectsHaveBeenBuilt(context, dependencies)).pipe(operators_1.switchMap((result) => {
        if (result) {
            return utils_1.compileTypeScriptFiles(normalizedOptions, context, libRoot, dependencies).pipe(operators_1.tap(() => {
                utils_1.updatePackageJson(normalizedOptions, context);
                if (dependencies.length > 0 &&
                    options.updateBuildableProjectDepsInPackageJson) {
                    plugin_utils_1.updateBuildableProjectPackageJsonDependencies(context, target, dependencies, normalizedOptions.buildableProjectDepsInPackageJsonType);
                }
            }), operators_1.switchMap(() => utils_1.copyAssetFiles(normalizedOptions, context)));
        }
        else {
            return rxjs_1.of({ success: false });
        }
    }), operators_1.map((value) => {
        return Object.assign(Object.assign({}, value), { outputPath: normalizedOptions.outputPath });
    }));
}
exports.runBuilder = runBuilder;
//@ts-ignore
exports.default = architect_1.createBuilder(runBuilder);
//# sourceMappingURL=builder.js.map