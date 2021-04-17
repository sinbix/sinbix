"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePackageJson = void 0;
const fileutils_1 = require("@sinbix/core/utils/fileutils");
const config_1 = require("./config");
function generatePackageJson(projectName, graph, options) {
    const npmDeps = findAllNpmDeps(projectName, graph);
    // default package.json if one does not exist
    let packageJson = {
        name: projectName,
        version: '0.0.1',
        main: config_1.OUT_FILENAME,
        dependencies: {},
    };
    try {
        packageJson = fileutils_1.readJsonFile(`${options.projectRoot}/package.json`);
        if (!packageJson.dependencies) {
            packageJson.dependencies = {};
        }
    }
    catch (e) { }
    const rootPackageJson = fileutils_1.readJsonFile(`${options.root}/package.json`);
    Object.entries(npmDeps).forEach(([packageName, version]) => {
        var _a;
        // don't include devDeps
        if ((_a = rootPackageJson.devDependencies) === null || _a === void 0 ? void 0 : _a[packageName]) {
            return;
        }
        packageJson.dependencies[packageName] = version;
    });
    fileutils_1.writeJsonFile(`${options.outputPath}/package.json`, packageJson);
}
exports.generatePackageJson = generatePackageJson;
function findAllNpmDeps(projectName, graph, list = {}, seen = new Set()) {
    var _a;
    if (seen.has(projectName)) {
        return list;
    }
    seen.add(projectName);
    const node = graph.nodes[projectName];
    if (node.type === 'npm') {
        list[node.data.packageName] = node.data.version;
    }
    (_a = graph.dependencies[projectName]) === null || _a === void 0 ? void 0 : _a.forEach((dep) => {
        findAllNpmDeps(dep.target, graph, list, seen);
    });
    return list;
}
//# sourceMappingURL=generate-package-json.js.map