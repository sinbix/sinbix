"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceIntegrityChecks = void 0;
const output_1 = require("../utils/output");
const file_utils_1 = require("../file-utils");
class WorkspaceIntegrityChecks {
    constructor(projectGraph, files) {
        this.projectGraph = projectGraph;
        this.files = files;
    }
    run() {
        return [...this.projectWithoutFilesCheck(), ...this.filesWithoutProjects()];
    }
    projectWithoutFilesCheck() {
        const errors = Object.values(this.projectGraph.nodes)
            .filter((n) => n.data.files.length === 0)
            .map((p) => `Cannot find project '${p.name}' in '${p.data.root}'`);
        const errorGroupBodyLines = errors.map((f) => `${output_1.output.colors.gray('-')} ${f}`);
        return errors.length === 0
            ? []
            : [
                {
                    title: `The ${file_utils_1.workspaceFileName()} file is out of sync`,
                    bodyLines: errorGroupBodyLines,
                },
            ];
    }
    filesWithoutProjects() {
        const allFilesFromProjects = this.allProjectFiles();
        const allFilesWithoutProjects = minus(this.files, allFilesFromProjects);
        const first5FilesWithoutProjects = allFilesWithoutProjects.length > 5
            ? allFilesWithoutProjects.slice(0, 5)
            : allFilesWithoutProjects;
        const errorGroupBodyLines = first5FilesWithoutProjects.map((f) => `${output_1.output.colors.gray('-')} ${f}`);
        return first5FilesWithoutProjects.length === 0
            ? []
            : [
                {
                    title: `The following file(s) do not belong to any projects:`,
                    bodyLines: errorGroupBodyLines,
                },
            ];
    }
    allProjectFiles() {
        return Object.values(this.projectGraph.nodes).reduce((m, c) => [...m, ...c.data.files.map((f) => f.file)], []);
    }
}
exports.WorkspaceIntegrityChecks = WorkspaceIntegrityChecks;
function minus(a, b) {
    return a.filter((aa) => b.indexOf(aa) === -1);
}
//# sourceMappingURL=workspace-integrity-checks.js.map