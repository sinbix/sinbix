"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniq = exports.getSize = exports.exists = exports.fileExists = exports.directoryExists = exports.getCwd = exports.rmDist = exports.cleanup = exports.readFile = exports.readJson = exports.listFiles = exports.checkFilesExist = exports.renameFile = exports.updateFile = exports.copyNodeModules = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const paths_1 = require("./paths");
function copyNodeModules(project, modules) {
    modules.forEach((module) => {
        fs_extra_1.removeSync(`${paths_1.tmpProjPath(project)}/node_modules/${module}`);
        fs_extra_1.copySync(`./node_modules/${module}`, `${paths_1.tmpProjPath(project)}/node_modules/${module}`);
    });
}
exports.copyNodeModules = copyNodeModules;
function updateFile(project, path, content) {
    fs_extra_1.ensureDirSync(path_1.dirname(paths_1.tmpProjPath(project, path)));
    if (typeof content === 'string') {
        fs_extra_1.writeFileSync(paths_1.tmpProjPath(project, path), content);
    }
    else {
        fs_extra_1.writeFileSync(paths_1.tmpProjPath(project, path), content(fs_extra_1.readFileSync(paths_1.tmpProjPath(project, path)).toString()));
    }
}
exports.updateFile = updateFile;
function renameFile(project, path, newPath) {
    fs_extra_1.ensureDirSync(path_1.dirname(paths_1.tmpProjPath(project, newPath)));
    fs_extra_1.renameSync(paths_1.tmpProjPath(project, path), paths_1.tmpProjPath(project, newPath));
}
exports.renameFile = renameFile;
function checkFilesExist(project, expectedPaths) {
    expectedPaths.forEach((path) => {
        const opts = { project, path };
        const filePath = paths_1.tmpProjPath(project, path);
        if (!exists(filePath)) {
            throw new Error(`'${filePath}' does not exist`);
        }
    });
}
exports.checkFilesExist = checkFilesExist;
function listFiles(project, path) {
    return fs_extra_1.readdirSync(paths_1.tmpProjPath(project, path));
}
exports.listFiles = listFiles;
function readJson(project, path) {
    return JSON.parse(readFile(project, path));
}
exports.readJson = readJson;
function readFile(project, path) {
    const filePath = paths_1.tmpProjPath(project, path);
    return fs_extra_1.readFileSync(filePath).toString();
}
exports.readFile = readFile;
function cleanup(project) {
    fs_extra_1.removeSync(paths_1.tmpProjPath(project));
}
exports.cleanup = cleanup;
function rmDist(project) {
    fs_extra_1.removeSync(`${paths_1.tmpProjPath(project)}/dist`);
}
exports.rmDist = rmDist;
function getCwd() {
    return process.cwd();
}
exports.getCwd = getCwd;
function directoryExists(path) {
    try {
        return fs_extra_1.statSync(path).isDirectory();
    }
    catch (err) {
        return false;
    }
}
exports.directoryExists = directoryExists;
function fileExists(path) {
    try {
        return fs_extra_1.statSync(path).isFile();
    }
    catch (err) {
        return false;
    }
}
exports.fileExists = fileExists;
function exists(path) {
    return directoryExists(path) || fileExists(path);
}
exports.exists = exists;
function getSize(path) {
    return fs_extra_1.statSync(path).size;
}
exports.getSize = getSize;
function uniq(prefix) {
    return `${prefix}${Math.floor(Math.random() * 10000000)}`;
}
exports.uniq = uniq;
//# sourceMappingURL=common.js.map