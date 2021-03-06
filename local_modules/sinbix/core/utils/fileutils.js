"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRelativePath = exports.renameSync = exports.createDirectory = exports.fileExists = exports.directoryExists = exports.copyFile = exports.readWorkspaceConfigPath = exports.writeJsonFile = exports.parseJsonWithComments = exports.readJsonFile = exports.serializeJson = exports.updateJsonFile = exports.writeToFile = void 0;
const fs = require("fs");
const fs_extra_1 = require("fs-extra");
const path = require("path");
const stripJsonComments = require("strip-json-comments");
// const ignore = require('ignore');
function writeToFile(filePath, str) {
    fs_extra_1.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, str);
}
exports.writeToFile = writeToFile;
/**
 * This method is specifically for updating a JSON file using the filesystem
 *
 * @remarks
 * If you are looking to update a JSON file in a tree, look for ./ast-utils#updateJsonInTree
 * @param path Path of the JSON file on the filesystem
 * @param callback Manipulation of the JSON data
 */
function updateJsonFile(path, callback) {
    const json = readJsonFile(path);
    callback(json);
    writeJsonFile(path, json);
}
exports.updateJsonFile = updateJsonFile;
function serializeJson(json) {
    return `${JSON.stringify(json, null, 2)}\n`;
}
exports.serializeJson = serializeJson;
/**
 * This method is specifically for reading a JSON file from the filesystem
 *
 * @remarks
 * If you are looking to read a JSON file in a Tree, use ./ast-utils#readJsonInTree
 * @param path Path of the JSON file on the filesystem
 */
function readJsonFile(path) {
    return parseJsonWithComments(fs.readFileSync(path, 'utf-8'));
}
exports.readJsonFile = readJsonFile;
function parseJsonWithComments(content) {
    return JSON.parse(stripJsonComments(content));
}
exports.parseJsonWithComments = parseJsonWithComments;
function writeJsonFile(path, json) {
    writeToFile(path, serializeJson(json));
}
exports.writeJsonFile = writeJsonFile;
function readWorkspaceConfigPath() {
    if (fileExists('workspace.json')) {
        return readJsonFile('workspace.json');
    }
    else {
        return readJsonFile('angular.json');
    }
}
exports.readWorkspaceConfigPath = readWorkspaceConfigPath;
function copyFile(file, target) {
    const f = path.basename(file);
    const source = fs.createReadStream(file);
    const dest = fs.createWriteStream(path.resolve(target, f));
    source.pipe(dest);
    source.on('error', (e) => console.error(e));
}
exports.copyFile = copyFile;
function directoryExists(name) {
    try {
        return fs.statSync(name).isDirectory();
    }
    catch (e) {
        return false;
    }
}
exports.directoryExists = directoryExists;
function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    }
    catch (err) {
        return false;
    }
}
exports.fileExists = fileExists;
function createDirectory(directoryPath) {
    const parentPath = path.resolve(directoryPath, '..');
    if (!directoryExists(parentPath)) {
        createDirectory(parentPath);
    }
    if (!directoryExists(directoryPath)) {
        fs.mkdirSync(directoryPath);
    }
}
exports.createDirectory = createDirectory;
function renameSync(from, to, cb) {
    try {
        if (!fs.existsSync(from)) {
            throw new Error(`Path: ${from} does not exist`);
        }
        else if (fs.existsSync(to)) {
            throw new Error(`Path: ${to} already exists`);
        }
        // Make sure parent path exists
        const parentPath = path.resolve(to, '..');
        createDirectory(parentPath);
        fs.renameSync(from, to);
        cb(null);
    }
    catch (e) {
        cb(e);
    }
}
exports.renameSync = renameSync;
function isRelativePath(path) {
    return (path === '.' ||
        path === '..' ||
        path.startsWith('./') ||
        path.startsWith('../'));
}
exports.isRelativePath = isRelativePath;
//# sourceMappingURL=fileutils.js.map