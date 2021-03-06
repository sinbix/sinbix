"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workspaceLint = void 0;
const project_graph_1 = require("../project-graph");
const workspace_integrity_checks_1 = require("./workspace-integrity-checks");
const file_utils_1 = require("../file-utils");
const output_1 = require("../utils/output");
const path = require("path");
function workspaceLint() {
    const graph = project_graph_1.onlyWorkspaceProjects(project_graph_1.createProjectGraph());
    const cliErrorOutputConfigs = new workspace_integrity_checks_1.WorkspaceIntegrityChecks(graph, readAllFilesFromAppsAndLibs()).run();
    if (cliErrorOutputConfigs.length > 0) {
        cliErrorOutputConfigs.forEach((errorConfig) => {
            output_1.output.error(errorConfig);
        });
        process.exit(1);
    }
}
exports.workspaceLint = workspaceLint;
function readAllFilesFromAppsAndLibs() {
    const wl = file_utils_1.workspaceLayout();
    return file_utils_1.readWorkspaceFiles()
        .map((f) => f.file)
        .filter((f) => f.startsWith(`${wl.appsDir}/`) || f.startsWith(`${wl.libsDir}/`))
        .filter((f) => !path.basename(f).startsWith('.'));
}
//# sourceMappingURL=lint.js.map