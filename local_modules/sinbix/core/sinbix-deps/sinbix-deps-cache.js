"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.differentFromCache = exports.writeCache = exports.readCache = void 0;
const file_utils_1 = require("../file-utils");
const path_1 = require("path");
const app_root_1 = require("../utils/app-root");
const fs_1 = require("fs");
const fsExtra = require("fs-extra");
const fileutils_1 = require("../utils/fileutils");
const perf_hooks_1 = require("perf_hooks");
const sinbixDepsDir = path_1.join(app_root_1.appRootPath, 'node_modules', '.cache', 'sinbix');
const sinbixDepsPath = path_1.join(sinbixDepsDir, 'sinbixdeps.json');
function readCache() {
    perf_hooks_1.performance.mark('read cache:start');
    try {
        if (!fs_1.existsSync(sinbixDepsDir)) {
            fsExtra.ensureDirSync(sinbixDepsDir);
        }
    }
    catch (e) {
        /*
         * @jeffbcross: Node JS docs recommend against checking for existence of directory immediately before creating it.
         * Instead, just try to create the directory and handle the error.
         *
         * We ran into race conditions when running scripts concurrently, where multiple scripts were
         * arriving here simultaneously, checking for directory existence, then trying to create the directory simultaneously.
         *
         * In this case, we're creating the directory. If the operation failed, we ensure that the directory
         * exists before continuing (or raise an exception).
         */
        if (!fileutils_1.directoryExists(sinbixDepsDir)) {
            throw new Error(`Failed to create directory: ${sinbixDepsDir}`);
        }
    }
    const data = fileutils_1.fileExists(sinbixDepsPath) ? fileutils_1.readJsonFile(sinbixDepsPath) : null;
    perf_hooks_1.performance.mark('read cache:end');
    perf_hooks_1.performance.measure('read cache', 'read cache:start', 'read cache:end');
    return data ? data : false;
}
exports.readCache = readCache;
function writeCache(rootFiles, projectGraph) {
    perf_hooks_1.performance.mark('write cache:start');
    fileutils_1.writeJsonFile(sinbixDepsPath, {
        version: '2.0',
        rootFiles,
        nodes: projectGraph.nodes,
        dependencies: projectGraph.dependencies,
    });
    perf_hooks_1.performance.mark('write cache:end');
    perf_hooks_1.performance.measure('write cache', 'write cache:start', 'write cache:end');
}
exports.writeCache = writeCache;
function differentFromCache(fileMap, c) {
    const currentProjects = Object.keys(fileMap).sort();
    const previousProjects = Object.keys(c.nodes)
        .sort()
        .filter((name) => c.nodes[name].data.files.length > 0);
    // Projects changed -> compute entire graph
    if (currentProjects.length !== previousProjects.length ||
        currentProjects.some((val, idx) => val !== previousProjects[idx])) {
        return {
            filesDifferentFromCache: fileMap,
            partiallyConstructedProjectGraph: null,
            noDifference: false,
        };
    }
    // Projects are same -> compute projects with file changes
    const filesDifferentFromCache = {};
    currentProjects.forEach((p) => {
        if (file_utils_1.filesChanged(c.nodes[p].data.files, fileMap[p])) {
            filesDifferentFromCache[p] = fileMap[p];
        }
    });
    // Re-compute nodes and dependencies for each project in file map.
    Object.keys(filesDifferentFromCache).forEach((key) => {
        delete c.dependencies[key];
    });
    const partiallyConstructedProjectGraph = {
        nodes: c.nodes,
        dependencies: c.dependencies,
    };
    return {
        filesDifferentFromCache: filesDifferentFromCache,
        partiallyConstructedProjectGraph,
        noDifference: Object.keys(filesDifferentFromCache).length === 0,
    };
}
exports.differentFromCache = differentFromCache;
//# sourceMappingURL=sinbix-deps-cache.js.map