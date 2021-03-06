"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFileHasher = exports.FileHasher = exports.extractNameAndVersion = void 0;
const git_hasher_1 = require("./git-hasher");
const fs_1 = require("fs");
const hashing_impl_1 = require("./hashing-impl");
const app_root_1 = require("../utils/app-root");
const perf_hooks_1 = require("perf_hooks");
function extractNameAndVersion(content) {
    try {
        const c = JSON.parse(content);
        return `${c.name}${c.version}`;
    }
    catch (e) {
        return '';
    }
}
exports.extractNameAndVersion = extractNameAndVersion;
class FileHasher {
    constructor(hashing) {
        this.hashing = hashing;
        this.fileHashes = {};
        this.workspaceFiles = [];
        this.usesGitForHashing = false;
        this.init();
    }
    init() {
        perf_hooks_1.performance.mark('init hashing:start');
        this.fileHashes = {};
        this.workspaceFiles = [];
        this.getHashesFromGit();
        this.usesGitForHashing = Object.keys(this.fileHashes).length > 0;
        perf_hooks_1.performance.mark('init hashing:end');
        perf_hooks_1.performance.measure('init hashing', 'init hashing:start', 'init hashing:end');
    }
    hashFile(path, transformer = null) {
        const relativePath = path.startsWith(app_root_1.appRootPath)
            ? path.substr(app_root_1.appRootPath.length + 1)
            : path;
        if (!this.fileHashes[relativePath]) {
            this.fileHashes[relativePath] = this.processPath({ path, transformer });
        }
        return this.fileHashes[relativePath];
    }
    getHashesFromGit() {
        const sliceIndex = app_root_1.appRootPath.length + 1;
        git_hasher_1.getFileHashes(app_root_1.appRootPath).forEach((hash, filename) => {
            this.fileHashes[filename.substr(sliceIndex)] = hash;
            /**
             * we have to store it separately because fileHashes can be modified
             * later on and can contain files that do not exist in the workspace
             */
            this.workspaceFiles.push(filename.substr(sliceIndex));
        });
    }
    processPath(pathAndTransformer) {
        try {
            if (pathAndTransformer.transformer) {
                const transformedFile = pathAndTransformer.transformer(fs_1.readFileSync(pathAndTransformer.path).toString());
                return this.hashing.hashArray([transformedFile]);
            }
            else {
                return this.hashing.hashFile(pathAndTransformer.path);
            }
        }
        catch (e) {
            return '';
        }
    }
}
exports.FileHasher = FileHasher;
exports.defaultFileHasher = new FileHasher(hashing_impl_1.defaultHashing);
//# sourceMappingURL=file-hasher.js.map