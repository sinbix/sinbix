"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeSlashes = exports.getNewProjectName = exports.getDestination = exports.normalizeProjectConfig = exports.normalizeProject = exports.normalizeProjectName = void 0;
const name_utils_1 = require("./name-utils");
const ast_utils_1 = require("./ast-utils");
const path_1 = require("path");
function normalizeProjectName(name) {
    return name_utils_1.toFileName(name).replace(new RegExp('/', 'g'), '-');
}
exports.normalizeProjectName = normalizeProjectName;
function normalizeProject(options) {
    const name = options.name;
    const projectRoot = options.directory
        ? `${name_utils_1.toFileName(options.directory)}/${name}`
        : name;
    const projectName = normalizeProjectName(projectRoot);
    const projectTags = options.tags
        ? options.tags.split(',').map((s) => s.trim())
        : [];
    return {
        projectName,
        projectRoot,
        projectTags,
    };
}
exports.normalizeProject = normalizeProject;
function normalizeProjectConfig(host, project) {
    const projectConfig = ast_utils_1.getProjectConfig(host, project);
    return {
        projectConfig,
    };
}
exports.normalizeProjectConfig = normalizeProjectConfig;
function getDestination(path) {
    return path_1.join(path).split(path_1.sep).join('/');
}
exports.getDestination = getDestination;
function getNewProjectName(path) {
    return path.replace(/\//g, '-');
}
exports.getNewProjectName = getNewProjectName;
function normalizeSlashes(input) {
    return input
        .split('/')
        .filter((x) => !!x)
        .join('/');
}
exports.normalizeSlashes = normalizeSlashes;
//# sourceMappingURL=project.js.map