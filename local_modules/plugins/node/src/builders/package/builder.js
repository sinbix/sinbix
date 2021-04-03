"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBuilder = void 0;
const architect_1 = require("@angular-devkit/architect");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const utils_1 = require("@sinbix/utils");
const utils_2 = require("./utils");
function runBuilder(options, context) {
    const libRoot = utils_1.getBuilderProjectData(context).root;
    const normalizedOptions = utils_2.normalizeOptions(options, context, libRoot);
    const { target, dependencies } = utils_1.calculateProjectDependencies(utils_1.getProjectGraphFromHost(utils_1.createBuilderHost(context)), context);
    return rxjs_1.of(utils_1.checkDependentProjectsHaveBeenBuilt(context, dependencies)).pipe(operators_1.switchMap((result) => {
        if (result) {
            return utils_2.compileTypeScriptFiles(normalizedOptions, context, libRoot, dependencies).pipe(operators_1.tap(() => {
                utils_2.updatePackageJson(normalizedOptions, context);
                if (dependencies.length > 0 &&
                    options.updateBuildableProjectDepsInPackageJson) {
                    utils_1.updateBuildableProjectPackageJsonDependencies(context, target, dependencies, normalizedOptions.buildableProjectDepsInPackageJsonType);
                }
            }), operators_1.switchMap(() => utils_2.copyAssetFiles(normalizedOptions, context)));
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