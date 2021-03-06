"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesChanged = exports.normalizedProjectRoot = exports.readEnvironment = exports.readWorkspaceFiles = exports.rootWorkspaceFileData = exports.rootWorkspaceFileNames = exports.workspaceLayout = exports.readSinbixJson = exports.readPackageJson = exports.defaultFileRead = exports.workspaceFileName = exports.cliCommand = exports.readWorkspaceJson = exports.allFilesInDir = exports.TEN_MEGABYTES = exports.calculateFileChanges = exports.isWholeFileChange = exports.WholeFileChange = void 0;
const child_process_1 = require("child_process");
const fs = require("fs");
const fs_1 = require("fs");
const path = require("path");
const path_1 = require("path");
const workspace_results_1 = require("./command-line/workspace-results");
const app_root_1 = require("./utils/app-root");
const fileutils_1 = require("./utils/fileutils");
const json_diff_1 = require("./utils/json-diff");
const file_hasher_1 = require("./hasher/file-hasher");
const perf_hooks_1 = require("perf_hooks");
const ignore_1 = require("ignore");
class WholeFileChange {
    constructor() {
        this.type = 'WholeFileChange';
    }
}
exports.WholeFileChange = WholeFileChange;
function isWholeFileChange(change) {
    return change.type === 'WholeFileChange';
}
exports.isWholeFileChange = isWholeFileChange;
function calculateFileChanges(files, sinbixArgs, readFileAtRevision = defaultReadFileAtRevision, ignore = getIgnoredGlobs()) {
    if (ignore) {
        files = files.filter((f) => !ignore.ignores(f));
    }
    return files.map((f) => {
        const ext = path_1.extname(f);
        const hash = file_hasher_1.defaultFileHasher.hashFile(f);
        return {
            file: f,
            ext,
            hash,
            getChanges: () => {
                if (!sinbixArgs) {
                    return [new WholeFileChange()];
                }
                if (sinbixArgs.files && sinbixArgs.files.includes(f)) {
                    return [new WholeFileChange()];
                }
                switch (ext) {
                    case '.json':
                        const atBase = readFileAtRevision(f, sinbixArgs.base);
                        const atHead = readFileAtRevision(f, sinbixArgs.head);
                        try {
                            return json_diff_1.jsonDiff(JSON.parse(atBase), JSON.parse(atHead));
                        }
                        catch (e) {
                            return [new WholeFileChange()];
                        }
                    default:
                        return [new WholeFileChange()];
                }
            },
        };
    });
}
exports.calculateFileChanges = calculateFileChanges;
exports.TEN_MEGABYTES = 1024 * 10000;
function defaultReadFileAtRevision(file, revision) {
    try {
        const fileFullPath = `${app_root_1.appRootPath}${path.sep}${file}`;
        const gitRepositoryPath = child_process_1.execSync('git rev-parse --show-toplevel')
            .toString()
            .trim();
        const filePathInGitRepository = path
            .relative(gitRepositoryPath, fileFullPath)
            .split(path.sep)
            .join('/');
        return !revision
            ? fs_1.readFileSync(file).toString()
            : child_process_1.execSync(`git show ${revision}:${filePathInGitRepository}`, {
                maxBuffer: exports.TEN_MEGABYTES,
            })
                .toString()
                .trim();
    }
    catch (_a) {
        return '';
    }
}
function getFileData(filePath) {
    const file = path.relative(app_root_1.appRootPath, filePath).split(path.sep).join('/');
    return {
        file: file,
        hash: file_hasher_1.defaultFileHasher.hashFile(filePath),
        ext: path.extname(filePath),
    };
}
function allFilesInDir(dirName, recurse = true) {
    const ignoredGlobs = getIgnoredGlobs();
    const relDirName = path.relative(app_root_1.appRootPath, dirName);
    if (relDirName && ignoredGlobs.ignores(relDirName)) {
        return [];
    }
    let res = [];
    try {
        fs.readdirSync(dirName).forEach((c) => {
            const child = path.join(dirName, c);
            if (ignoredGlobs.ignores(path.relative(app_root_1.appRootPath, child))) {
                return;
            }
            try {
                const s = fs.statSync(child);
                if (!s.isDirectory()) {
                    // add starting with "apps/myapp/..." or "libs/mylib/..."
                    res.push(getFileData(child));
                }
                else if (s.isDirectory() && recurse) {
                    res = [...res, ...allFilesInDir(child)];
                }
            }
            catch (e) { }
        });
    }
    catch (e) { }
    return res;
}
exports.allFilesInDir = allFilesInDir;
function getIgnoredGlobs() {
    const ig = ignore_1.default();
    ig.add(readFileIfExisting(`${app_root_1.appRootPath}/.gitignore`));
    ig.add(readFileIfExisting(`${app_root_1.appRootPath}/.sinbixignore`));
    return ig;
}
function readFileIfExisting(path) {
    return fs.existsSync(path) ? fs.readFileSync(path, 'UTF-8').toString() : '';
}
function readWorkspaceJson() {
    return fileutils_1.readJsonFile(`${app_root_1.appRootPath}/${workspaceFileName()}`);
}
exports.readWorkspaceJson = readWorkspaceJson;
function cliCommand() {
    return 'ng';
}
exports.cliCommand = cliCommand;
function workspaceFileName() {
    if (fileutils_1.fileExists(`${app_root_1.appRootPath}/angular.json`)) {
        return 'angular.json';
    }
    else {
        return 'workspace.json';
    }
}
exports.workspaceFileName = workspaceFileName;
function defaultFileRead(filePath) {
    return fs_1.readFileSync(path_1.join(app_root_1.appRootPath, filePath), 'UTF-8');
}
exports.defaultFileRead = defaultFileRead;
function readPackageJson() {
    return fileutils_1.readJsonFile(`${app_root_1.appRootPath}/package.json`);
}
exports.readPackageJson = readPackageJson;
function readSinbixJson() {
    const config = fileutils_1.readJsonFile(`${app_root_1.appRootPath}/sinbix.json`);
    if (!config.npmScope) {
        throw new Error(`sinbix.json must define the npmScope property.`);
    }
    return config;
}
exports.readSinbixJson = readSinbixJson;
function workspaceLayout() {
    const sinbixJson = readSinbixJson();
    const appsDir = (sinbixJson.workspaceLayout && sinbixJson.workspaceLayout.appsDir) || 'apps';
    const libsDir = (sinbixJson.workspaceLayout && sinbixJson.workspaceLayout.libsDir) || 'libs';
    return { appsDir, libsDir };
}
exports.workspaceLayout = workspaceLayout;
// TODO: Make this list extensible
function rootWorkspaceFileNames() {
    return [`package.json`, workspaceFileName(), `sinbix.json`, `tsconfig.base.json`];
}
exports.rootWorkspaceFileNames = rootWorkspaceFileNames;
function rootWorkspaceFileData() {
    return rootWorkspaceFileNames().map((f) => getFileData(`${app_root_1.appRootPath}/${f}`));
}
exports.rootWorkspaceFileData = rootWorkspaceFileData;
function readWorkspaceFiles() {
    perf_hooks_1.performance.mark('read workspace files:start');
    if (file_hasher_1.defaultFileHasher.usesGitForHashing) {
        const ignoredGlobs = getIgnoredGlobs();
        const r = file_hasher_1.defaultFileHasher.workspaceFiles
            .filter((f) => !ignoredGlobs.ignores(f))
            .map((f) => getFileData(`${app_root_1.appRootPath}/${f}`));
        perf_hooks_1.performance.mark('read workspace files:end');
        perf_hooks_1.performance.measure('read workspace files', 'read workspace files:start', 'read workspace files:end');
        r.sort((x, y) => x.file.localeCompare(y.file));
        return r;
    }
    else {
        const r = [];
        r.push(...rootWorkspaceFileData());
        // Add known workspace files and directories
        r.push(...allFilesInDir(app_root_1.appRootPath, false));
        r.push(...allFilesInDir(`${app_root_1.appRootPath}/tools`));
        const wl = workspaceLayout();
        r.push(...allFilesInDir(`${app_root_1.appRootPath}/${wl.appsDir}`));
        if (wl.appsDir !== wl.libsDir) {
            r.push(...allFilesInDir(`${app_root_1.appRootPath}/${wl.libsDir}`));
        }
        perf_hooks_1.performance.mark('read workspace files:end');
        perf_hooks_1.performance.measure('read workspace files', 'read workspace files:start', 'read workspace files:end');
        r.sort((x, y) => x.file.localeCompare(y.file));
        return r;
    }
}
exports.readWorkspaceFiles = readWorkspaceFiles;
function readEnvironment(target, projects) {
    const sinbixJson = readSinbixJson();
    const workspaceJson = readWorkspaceJson();
    const workspaceResults = new workspace_results_1.WorkspaceResults(target, projects);
    return { sinbixJson: sinbixJson, workspaceJson, workspaceResults };
}
exports.readEnvironment = readEnvironment;
function normalizedProjectRoot(p) {
    if (p.data && p.data.root) {
        const path = p.data.root.split('/').filter((v) => !!v);
        if (path.length === 1) {
            return path[0];
        }
        // Remove the first part of the path, usually 'libs'
        return path.slice(1).join('/');
    }
    else {
        return '';
    }
}
exports.normalizedProjectRoot = normalizedProjectRoot;
function filesChanged(a, b) {
    if (a.length !== b.length)
        return true;
    for (let i = 0; i < a.length; ++i) {
        if (a[i].file !== b[i].file)
            return true;
        if (a[i].hash !== b[i].hash)
            return true;
    }
    return false;
}
exports.filesChanged = filesChanged;
//# sourceMappingURL=file-utils.js.map