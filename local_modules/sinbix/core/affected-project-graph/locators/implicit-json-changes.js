"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImplicitlyTouchedProjectsByJsonChanges = void 0;
const flatten = require("flat");
const minimatch = require("minimatch");
const json_diff_1 = require("../../utils/json-diff");
exports.getImplicitlyTouchedProjectsByJsonChanges = (touchedFiles, workspaceJson, sinbixJson) => {
    const { implicitDependencies } = sinbixJson;
    if (!implicitDependencies) {
        return [];
    }
    const touched = new Set();
    for (const f of touchedFiles) {
        if (f.file.endsWith('.json') && implicitDependencies[f.file]) {
            const changes = f.getChanges();
            for (const c of changes) {
                if (json_diff_1.isJsonChange(c)) {
                    const projects = getTouchedProjects(c.path, implicitDependencies[f.file]) || [];
                    projects.forEach((p) => touched.add(p));
                }
                else {
                    const projects = getTouchedProjectsByJsonFile(implicitDependencies, f.file);
                    projects.forEach((p) => touched.add(p));
                }
            }
        }
    }
    return [...touched];
};
function getTouchedProjectsByJsonFile(implicitDependencies, file) {
    const projects = [];
    json_diff_1.walkJsonTree(implicitDependencies[file], [], (p, value) => {
        if (Array.isArray(value)) {
            projects.push(...value);
        }
        return !Array.isArray(value);
    });
    return projects;
}
function getTouchedProjects(path, implicitDependencyConfig) {
    const flatConfig = flatten(implicitDependencyConfig, { safe: true });
    const flatPath = path.join('.');
    for (const [key, value] of Object.entries(flatConfig)) {
        if (minimatch(flatPath, key)) {
            return Array.isArray(value) ? value : [];
        }
    }
    return [];
}
//# sourceMappingURL=implicit-json-changes.js.map