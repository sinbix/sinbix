"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const tslib_1 = require("tslib");
const app_root_1 = require("../utils/app-root");
const fs_1 = require("fs");
const path_1 = require("path");
const fsExtra = require("fs-extra");
const child_process_1 = require("child_process");
class CacheConfig {
    constructor(options) {
        this.options = options;
    }
    isCacheableTask(task) {
        const cacheable = this.options.cacheableOperations || this.options.cacheableTargets;
        return (cacheable &&
            cacheable.indexOf(task.target.target) > -1 &&
            !this.longRunningTask(task));
    }
    longRunningTask(task) {
        return !!task.overrides['watch'];
    }
}
class Cache {
    constructor(options) {
        this.options = options;
        this.root = app_root_1.appRootPath;
        this.cachePath = this.createCacheDir();
        this.terminalOutputsDir = this.createTerminalOutputsDir();
        this.cacheConfig = new CacheConfig(this.options);
    }
    removeOldCacheRecords() {
        /**
         * Even though spawning a process is fast, we don't want to do it every time
         * the user runs a command. Instead, we want to do it once in a while.
         */
        const shouldSpawnProcess = Math.floor(Math.random() * 50) === 1;
        if (shouldSpawnProcess) {
            const scriptPath = require.resolve('@sinbix/core/tasks-runner/remove-old-cache-records.js', { paths: [this.root] });
            try {
                const p = child_process_1.spawn('node', [scriptPath, `"${this.cachePath}"`], {
                    stdio: 'ignore',
                    detached: true,
                });
                p.unref();
            }
            catch (e) {
                console.log(`Unable to start remove-old-cache-records script:`);
                console.log(e.message);
            }
        }
    }
    get(task) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.cacheConfig.isCacheableTask(task))
                return null;
            const res = this.getFromLocalDir(task);
            // didn't find it locally but we have a remote cache
            if (!res && this.options.remoteCache) {
                // attempt remote cache
                yield this.options.remoteCache.retrieve(task.hash, this.cachePath);
                // try again from local cache
                return this.getFromLocalDir(task);
            }
            else {
                return res;
            }
        });
    }
    put(task, terminalOutputPath, outputs) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const terminalOutput = fs_1.readFileSync(terminalOutputPath).toString();
            const td = path_1.join(this.cachePath, task.hash);
            const tdCommit = path_1.join(this.cachePath, `${task.hash}.commit`);
            // might be left overs from partially-completed cache invocations
            if (fs_1.existsSync(tdCommit)) {
                fsExtra.removeSync(tdCommit);
            }
            if (fs_1.existsSync(td)) {
                fsExtra.removeSync(td);
            }
            fs_1.mkdirSync(td);
            fs_1.writeFileSync(path_1.join(td, 'terminalOutput'), terminalOutput);
            fs_1.mkdirSync(path_1.join(td, 'outputs'));
            outputs.forEach((f) => {
                const src = path_1.join(this.root, f);
                if (fs_1.existsSync(src)) {
                    const cached = path_1.join(td, 'outputs', f);
                    // Ensure parent directory is created if src is a file
                    const isFile = fs_1.lstatSync(src).isFile();
                    const directory = isFile ? path_1.resolve(cached, '..') : cached;
                    fsExtra.ensureDirSync(directory);
                    fsExtra.copySync(src, cached);
                }
            });
            // we need this file to account for partial writes to the cache folder.
            // creating this file is atomic, whereas creating a folder is not.
            // so if the process gets terminated while we are copying stuff into cache,
            // the cache entry won't be used.
            fs_1.writeFileSync(tdCommit, 'true');
            if (this.options.remoteCache) {
                yield this.options.remoteCache.store(task.hash, this.cachePath);
            }
        });
    }
    copyFilesFromCache(cachedResult, outputs) {
        outputs.forEach((f) => {
            const cached = path_1.join(cachedResult.outputsPath, f);
            if (fs_1.existsSync(cached)) {
                const isFile = fs_1.lstatSync(cached).isFile();
                const src = path_1.join(this.root, f);
                if (fs_1.existsSync(src)) {
                    fsExtra.removeSync(src);
                }
                // Ensure parent directory is created if src is a file
                const directory = isFile ? path_1.resolve(src, '..') : src;
                fsExtra.ensureDirSync(directory);
                fsExtra.copySync(cached, src);
            }
        });
    }
    temporaryOutputPath(task) {
        if (this.cacheConfig.isCacheableTask(task)) {
            return path_1.join(this.terminalOutputsDir, task.hash);
        }
        else {
            return null;
        }
    }
    getFromLocalDir(task) {
        const tdCommit = path_1.join(this.cachePath, `${task.hash}.commit`);
        const td = path_1.join(this.cachePath, task.hash);
        if (fs_1.existsSync(tdCommit)) {
            return {
                terminalOutput: fs_1.readFileSync(path_1.join(td, 'terminalOutput')).toString(),
                outputsPath: path_1.join(td, 'outputs'),
            };
        }
        else {
            return null;
        }
    }
    createCacheDir() {
        let dir;
        if (this.options.cacheDirectory) {
            if (this.options.cacheDirectory.startsWith('./')) {
                dir = path_1.join(this.root, this.options.cacheDirectory);
            }
            else {
                dir = this.options.cacheDirectory;
            }
        }
        else {
            dir = path_1.join(this.root, 'node_modules', '.cache', 'sinbix');
        }
        if (!fs_1.existsSync(dir)) {
            fsExtra.ensureDirSync(dir);
        }
        return dir;
    }
    createTerminalOutputsDir() {
        const path = path_1.join(this.cachePath, 'terminalOutputs');
        fsExtra.ensureDirSync(path);
        return path;
    }
}
exports.Cache = Cache;
//# sourceMappingURL=cache.js.map