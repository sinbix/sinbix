"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetProjectLocator = void 0;
const typescript_1 = require("./utils/typescript");
const file_utils_1 = require("./file-utils");
const project_graph_1 = require("./project-graph");
const fileutils_1 = require("./utils/fileutils");
const path_1 = require("path");
const app_root_1 = require("./utils/app-root");
class TargetProjectLocator {
    constructor(nodes, fileRead = file_utils_1.defaultFileRead) {
        var _a, _b;
        this.nodes = nodes;
        this.fileRead = fileRead;
        this.sortedProjects = project_graph_1.getSortedProjectNodes(this.nodes);
        this.sortedWorkspaceProjects = this.sortedProjects
            .filter(project_graph_1.isWorkspaceProject)
            .map((node) => (Object.assign(Object.assign({}, node), { data: Object.assign(Object.assign({}, node.data), { normalizedRoot: file_utils_1.normalizedProjectRoot(node) }) })));
        this.npmProjects = this.sortedProjects.filter(project_graph_1.isNpmProject);
        this.tsConfigPath = this.getRootTsConfigPath();
        this.absTsConfigPath = path_1.join(app_root_1.appRootPath, this.tsConfigPath);
        this.paths = (_b = (_a = fileutils_1.parseJsonWithComments(this.fileRead(this.tsConfigPath))) === null || _a === void 0 ? void 0 : _a.compilerOptions) === null || _b === void 0 ? void 0 : _b.paths;
        this.typescriptResolutionCache = new Map();
        this.npmResolutionCache = new Map();
    }
    /**
     * Find a project based on its import
     *
     * @param importExpr
     * @param filePath
     * @param npmScope
     *  Npm scope shouldn't be used finding a project, but, to improve backward
     *  compatibility, we fallback to checking the scope.
     *  This happens in cases where someone has the dist output in their tsconfigs
     *  and typescript will find the dist before the src.
     */
    findProjectWithImport(importExpr, filePath, npmScope) {
        const normalizedImportExpr = importExpr.split('#')[0];
        if (fileutils_1.isRelativePath(normalizedImportExpr)) {
            const resolvedModule = path_1.join(path_1.dirname(filePath), normalizedImportExpr);
            return this.findProjectOfResolvedModule(resolvedModule);
        }
        const npmProject = this.findNpmPackage(importExpr);
        if (npmProject) {
            return npmProject;
        }
        if (this.paths && this.paths[normalizedImportExpr]) {
            for (const p of this.paths[normalizedImportExpr]) {
                const maybeResolvedProject = this.findProjectOfResolvedModule(p);
                if (maybeResolvedProject) {
                    return maybeResolvedProject;
                }
            }
        }
        const resolvedModule = this.typescriptResolutionCache.has(normalizedImportExpr)
            ? this.typescriptResolutionCache.get(normalizedImportExpr)
            : typescript_1.resolveModuleByImport(normalizedImportExpr, filePath, this.absTsConfigPath);
        this.typescriptResolutionCache.set(normalizedImportExpr, resolvedModule);
        if (resolvedModule) {
            const resolvedProject = this.findProjectOfResolvedModule(resolvedModule);
            if (resolvedProject) {
                return resolvedProject;
            }
        }
        const importedProject = this.sortedWorkspaceProjects.find((p) => {
            const projectImport = `@${npmScope}/${p.data.normalizedRoot}`;
            return normalizedImportExpr.startsWith(projectImport);
        });
        return importedProject === null || importedProject === void 0 ? void 0 : importedProject.name;
    }
    findNpmPackage(npmImport) {
        var _a;
        if (this.npmResolutionCache.has(npmImport)) {
            return this.npmResolutionCache.get(npmImport);
        }
        else {
            const pkgName = (_a = this.npmProjects.find((pkg) => npmImport === pkg.data.packageName ||
                npmImport.startsWith(pkg.data.packageName + '/'))) === null || _a === void 0 ? void 0 : _a.name;
            this.npmResolutionCache.set(npmImport, pkgName);
            return pkgName;
        }
    }
    findProjectOfResolvedModule(resolvedModule) {
        const importedProject = this.sortedWorkspaceProjects.find((p) => {
            return resolvedModule.startsWith(p.data.root);
        });
        return importedProject === null || importedProject === void 0 ? void 0 : importedProject.name;
    }
    getRootTsConfigPath() {
        try {
            this.fileRead('tsconfig.base.json');
            return 'tsconfig.base.json';
        }
        catch (e) {
            return 'tsconfig.json';
        }
    }
}
exports.TargetProjectLocator = TargetProjectLocator;
//# sourceMappingURL=target-project-locator.js.map