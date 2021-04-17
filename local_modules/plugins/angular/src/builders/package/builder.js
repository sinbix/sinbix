"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBuilder = void 0;
const tslib_1 = require("tslib");
const architect_1 = require("@angular-devkit/architect");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const utils_1 = require("@sinbix/core/plugin-utils");
const project_graph_1 = require("@sinbix/core/project-graph");
const path_1 = require("path");
const ng = require("@angular/compiler-cli");
function initializeNgPackagr(options, context, projectDependencies) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const packager = (yield Promise.resolve().then(() => require('ng-packagr'))).ngPackagr();
        packager.forProject(path_1.resolve(context.workspaceRoot, options.project));
        if (options.tsConfig) {
            // read the tsconfig and modify its path in memory to
            // pass it on to ngpackagr
            const parsedTSConfig = ng.readConfiguration(options.tsConfig);
            utils_1.updatePaths(projectDependencies, parsedTSConfig.options.paths);
            packager.withTsConfig(parsedTSConfig);
        }
        return packager;
    });
}
function runBuilder(initializeNgPackagr) {
    return function run(options, context) {
        const projGraph = project_graph_1.createProjectGraph();
        const { target, dependencies } = utils_1.calculateProjectDependencies(projGraph, context);
        return rxjs_1.of(utils_1.checkDependentProjectsHaveBeenBuilt(context, dependencies)).pipe(operators_1.switchMap((result) => {
            if (result) {
                return rxjs_1.from(initializeNgPackagr(options, context, dependencies)).pipe(operators_1.switchMap((packager) => options.watch ? packager.watch() : packager.build()), operators_1.tap(() => {
                    if (dependencies.length > 0 &&
                        options.updateBuildableProjectDepsInPackageJson) {
                        utils_1.updateBuildableProjectPackageJsonDependencies(context, target, dependencies);
                    }
                }), operators_1.mapTo({ success: true }));
            }
            else {
                // just pass on the result
                return rxjs_1.of({ success: false });
            }
        }));
    };
}
exports.runBuilder = runBuilder;
//@ts-ignore
exports.default = architect_1.createBuilder(runBuilder(initializeNgPackagr));
//# sourceMappingURL=builder.js.map