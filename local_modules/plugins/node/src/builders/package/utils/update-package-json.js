"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePackageJson = void 0;
const path_1 = require("path");
const fileutils_1 = require("@sinbix/core/utils/fileutils");
const core_1 = require("@sinbix/core");
function updatePackageJson(options, context) {
    const packageJson = core_1.readJsonFile(path_1.join(context.workspaceRoot, options.packageJson));
    if (options.main) {
        const mainFile = path_1.basename(options.main).replace(/\.[tj]s$/, '');
        const typingsFile = `${mainFile}.d.ts`;
        const mainJsFile = `${mainFile}.js`;
        packageJson.main = path_1.normalize(`./${options.relativeMainFileOutput}/${mainJsFile}`);
        packageJson.typings = path_1.normalize(`./${options.relativeMainFileOutput}/${typingsFile}`);
    }
    fileutils_1.writeJsonFile(`${options.outputPath}/package.json`, packageJson);
}
exports.updatePackageJson = updatePackageJson;
//# sourceMappingURL=update-package-json.js.map