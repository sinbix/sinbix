"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImplicitlyTouchedProjects = exports.getTouchedProjects = void 0;
const minimatch = require("minimatch");
exports.getTouchedProjects = (touchedFiles, workspaceJson) => {
    // sort project names with the most nested first,
    // e.g. ['libs/a/b/c', 'libs/a/b', 'libs/a']
    const projectNames = Object.entries(workspaceJson.projects)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .sort(([name1, p1], [name2, p2]) => p1.root.length > p2.root.length ? -1 : 1)
        .map(([name]) => name);
    return touchedFiles
        .map((f) => {
        return projectNames.find((projectName) => {
            const p = workspaceJson.projects[projectName];
            const projectRoot = p.root.endsWith('/') ? p.root : p.root + '/';
            return f.file.startsWith(projectRoot);
        });
    })
        .filter(Boolean);
};
exports.getImplicitlyTouchedProjects = (fileChanges, workspaceJson, sinbixJson) => {
    if (!sinbixJson.implicitDependencies) {
        return [];
    }
    const touched = new Set();
    for (const [filePath, projects] of Object.entries(sinbixJson.implicitDependencies)) {
        const implicitDependencyWasChanged = fileChanges.some((f) => minimatch(f.file, filePath));
        if (!implicitDependencyWasChanged) {
            continue;
        }
        // File change affects all projects, just return all projects.
        if (Array.isArray(projects)) {
            projects.forEach((project) => touched.add(project));
        }
    }
    return Array.from(touched);
};
//# sourceMappingURL=workspace-projects.js.map