"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBuildableProjectPackageJsonDependencies = exports.updatePaths = exports.checkDependentProjectsHaveBeenBuilt = exports.createTmpTsConfig = exports.computeCompilerOptionsPaths = exports.calculateProjectDependencies = void 0;
const path_1 = require("path");
const literals_1 = require("@angular-devkit/core/src/utils/literals");
const ts = require("typescript");
const fs_1 = require("fs");
const project_graph_1 = require("@sinbix/core/project-graph");
const fileutils_1 = require("@sinbix/core/utils/fileutils");
const utils_1 = require("@sinbix/core/tasks-runner/utils");
function isBuildable(target, node) {
    return (node.data.architect &&
        node.data.architect[target] &&
        node.data.architect[target].builder !== '');
}
function calculateProjectDependencies(projGraph, context) {
    const target = projGraph.nodes[context.target.project];
    // gather the library dependencies
    const dependencies = recursivelyCollectDependencies(context.target.project, projGraph, [])
        .map((dep) => {
        const depNode = projGraph.nodes[dep];
        if (depNode.type === project_graph_1.ProjectType.lib &&
            isBuildable(context.target.target, depNode)) {
            const libPackageJson = fileutils_1.readJsonFile(path_1.join(context.workspaceRoot, depNode.data.root, 'package.json'));
            return {
                name: libPackageJson.name,
                outputs: utils_1.getOutputsForTargetAndConfiguration({
                    overrides: {},
                    target: context.target,
                }, depNode),
                node: depNode,
            };
        }
        else if (depNode.type === 'npm') {
            return {
                name: depNode.data.packageName,
                outputs: [],
                node: depNode,
            };
        }
        else {
            return null;
        }
    })
        .filter((x) => !!x);
    return { target, dependencies };
}
exports.calculateProjectDependencies = calculateProjectDependencies;
function recursivelyCollectDependencies(project, projGraph, acc) {
    (projGraph.dependencies[project] || []).forEach((dependency) => {
        if (acc.indexOf(dependency.target) === -1) {
            acc.push(dependency.target);
            recursivelyCollectDependencies(dependency.target, projGraph, acc);
        }
    });
    return acc;
}
function readTsConfigWithRemappedPaths(tsConfig, generatedTsConfigPath, dependencies) {
    const generatedTsConfig = { compilerOptions: {} };
    generatedTsConfig.extends = path_1.relative(path_1.dirname(generatedTsConfigPath), tsConfig);
    generatedTsConfig.compilerOptions.paths = computeCompilerOptionsPaths(tsConfig, dependencies);
    return generatedTsConfig;
}
function computeCompilerOptionsPaths(tsConfig, dependencies) {
    const paths = readPaths(tsConfig) || {};
    updatePaths(dependencies, paths);
    return paths;
}
exports.computeCompilerOptionsPaths = computeCompilerOptionsPaths;
function readPaths(tsConfig) {
    try {
        const parsedTSConfig = ts.readConfigFile(tsConfig, ts.sys.readFile).config;
        if (parsedTSConfig.compilerOptions &&
            parsedTSConfig.compilerOptions.paths) {
            return parsedTSConfig.compilerOptions.paths;
        }
        else if (parsedTSConfig.extends) {
            return readPaths(path_1.resolve(path_1.dirname(tsConfig), parsedTSConfig.extends));
        }
        else {
            return null;
        }
    }
    catch (e) {
        return null;
    }
}
function createTmpTsConfig(tsconfigPath, workspaceRoot, projectRoot, dependencies) {
    const tmpTsConfigPath = path_1.join(workspaceRoot, 'tmp', projectRoot, 'tsconfig.generated.json');
    const parsedTSConfig = readTsConfigWithRemappedPaths(tsconfigPath, tmpTsConfigPath, dependencies);
    process.on('exit', () => {
        cleanupTmpTsConfigFile(tmpTsConfigPath);
    });
    process.on('SIGTERM', () => {
        cleanupTmpTsConfigFile(tmpTsConfigPath);
        process.exit(0);
    });
    process.on('SIGINT', () => {
        cleanupTmpTsConfigFile(tmpTsConfigPath);
        process.exit(0);
    });
    fileutils_1.writeJsonFile(tmpTsConfigPath, parsedTSConfig);
    return path_1.join(tmpTsConfigPath);
}
exports.createTmpTsConfig = createTmpTsConfig;
function cleanupTmpTsConfigFile(tmpTsConfigPath) {
    try {
        if (tmpTsConfigPath) {
            fs_1.unlinkSync(tmpTsConfigPath);
        }
    }
    catch (e) { }
}
function checkDependentProjectsHaveBeenBuilt(context, projectDependencies) {
    const depLibsToBuildFirst = [];
    // verify whether all dependent libraries have been built
    projectDependencies.forEach((dep) => {
        if (dep.node.type !== project_graph_1.ProjectType.lib) {
            return;
        }
        const paths = dep.outputs.map((p) => path_1.join(context.workspaceRoot, p, 'package.json'));
        if (!paths.some(fileutils_1.fileExists)) {
            depLibsToBuildFirst.push(dep);
        }
    });
    if (depLibsToBuildFirst.length > 0) {
        context.logger.error(literals_1.stripIndents `
      Some of the project ${context.target.project}'s dependencies have not been built yet. Please build these libraries before:
      ${depLibsToBuildFirst.map((x) => ` - ${x.node.name}`).join('\n')}

      Try: sinbix run ${context.target.project}:${context.target.target} --with-deps
    `);
        return false;
    }
    else {
        return true;
    }
}
exports.checkDependentProjectsHaveBeenBuilt = checkDependentProjectsHaveBeenBuilt;
function updatePaths(dependencies, paths) {
    const pathsKeys = Object.keys(paths);
    dependencies.forEach((dep) => {
        if (dep.outputs && dep.outputs.length > 0) {
            paths[dep.name] = dep.outputs;
            // check for secondary entrypoints, only available for ng-packagr projects
            for (const path of pathsKeys) {
                if (path.startsWith(`${dep.name}/`)) {
                    const [, nestedPart] = path.split(`${dep.name}/`);
                    paths[path] = dep.outputs.map((o) => `${o}/${nestedPart}`);
                }
            }
        }
    });
}
exports.updatePaths = updatePaths;
/**
 * Updates the peerDependencies section in the `dist/lib/xyz/package.json` with
 * the proper dependency and version
 */
function updateBuildableProjectPackageJsonDependencies(context, node, dependencies, typeOfDependency = 'dependencies') {
    const outputs = utils_1.getOutputsForTargetAndConfiguration({
        overrides: {},
        target: context.target,
    }, node);
    const packageJsonPath = `${outputs[0]}/package.json`;
    let packageJson;
    let workspacePackageJson;
    try {
        packageJson = fileutils_1.readJsonFile(packageJsonPath);
        workspacePackageJson = fileutils_1.readJsonFile(`${context.workspaceRoot}/package.json`);
    }
    catch (e) {
        // cannot find or invalid package.json
        return;
    }
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.peerDependencies = packageJson.peerDependencies || {};
    let updatePackageJson = false;
    dependencies.forEach((entry) => {
        var _a;
        const packageName = entry.node.type === 'npm' ? entry.node.data.packageName : entry.name;
        if (packageName !== packageJson.name &&
            !hasDependency(packageJson, 'dependencies', packageName) &&
            !hasDependency(packageJson, 'devDependencies', packageName) &&
            !hasDependency(packageJson, 'peerDependencies', packageName)) {
            try {
                let depVersion;
                if (entry.node.type === project_graph_1.ProjectType.lib) {
                    const outputs = utils_1.getOutputsForTargetAndConfiguration({
                        overrides: {},
                        target: context.target,
                    }, entry.node);
                    const depPackageJsonPath = path_1.join(context.workspaceRoot, outputs[0], 'package.json');
                    depVersion = fileutils_1.readJsonFile(depPackageJsonPath).version;
                    packageJson[typeOfDependency][packageName] = depVersion;
                }
                else if (entry.node.type === 'npm') {
                    // If an npm dep is part of the workspace devDependencies, do not include it the library
                    if (!!((_a = workspacePackageJson.devDependencies) === null || _a === void 0 ? void 0 : _a[entry.node.data.packageName])) {
                        return;
                    }
                    depVersion = entry.node.data.version;
                    packageJson[typeOfDependency][entry.node.data.packageName] = depVersion;
                }
                updatePackageJson = true;
            }
            catch (e) {
                // skip if cannot find package.json
            }
        }
    });
    if (updatePackageJson) {
        fileutils_1.writeJsonFile(packageJsonPath, packageJson);
    }
}
exports.updateBuildableProjectPackageJsonDependencies = updateBuildableProjectPackageJsonDependencies;
// verify whether the package.json already specifies the dep
function hasDependency(outputJson, depConfigName, packageName) {
    if (outputJson[depConfigName]) {
        return outputJson[depConfigName][packageName];
    }
    else {
        return false;
    }
}
//# sourceMappingURL=buildable-libs-utils.js.map