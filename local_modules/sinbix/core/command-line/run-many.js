"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMany = void 0;
const tslib_1 = require("tslib");
const run_command_1 = require("../tasks-runner/run-command");
const utils_1 = require("./utils");
const project_graph_1 = require("../project-graph");
const file_utils_1 = require("../file-utils");
const default_reporter_1 = require("../tasks-runner/default-reporter");
const project_graph_utils_1 = require("../utils/project-graph-utils");
const output_1 = require("../utils/output");
function runMany(parsedArgs) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { sinbixArgs, overrides } = utils_1.splitArgsIntoSinbixArgsAndOverrides(parsedArgs, 'run-many');
        const projectGraph = project_graph_1.createProjectGraph();
        const projects = projectsToRun(sinbixArgs, projectGraph);
        const projectMap = {};
        projects.forEach((proj) => {
            projectMap[proj.name] = proj;
        });
        const env = file_utils_1.readEnvironment(sinbixArgs.target, projectMap);
        const filteredProjects = Object.values(projects).filter((n) => !parsedArgs.onlyFailed || !env.workspaceResults.getResult(n.name));
        run_command_1.runCommand(filteredProjects, projectGraph, env, sinbixArgs, overrides, new default_reporter_1.DefaultReporter(), null);
    });
}
exports.runMany = runMany;
function projectsToRun(sinbixArgs, projectGraph) {
    const allProjects = Object.values(projectGraph.nodes);
    if (sinbixArgs.all) {
        return runnableForTarget(allProjects, sinbixArgs.target);
    }
    else {
        checkForInvalidProjects(sinbixArgs, allProjects);
        let selectedProjects = allProjects.filter((p) => sinbixArgs.projects.indexOf(p.name) > -1);
        if (sinbixArgs.withDeps) {
            selectedProjects = Object.values(project_graph_1.withDeps(projectGraph, selectedProjects).nodes);
        }
        return runnableForTarget(selectedProjects, sinbixArgs.target, true);
    }
}
function checkForInvalidProjects(sinbixArgs, allProjects) {
    const invalid = sinbixArgs.projects.filter((name) => !allProjects.find((p) => p.name === name));
    if (invalid.length !== 0) {
        throw new Error(`Invalid projects: ${invalid.join(', ')}`);
    }
}
function runnableForTarget(projects, target, strict = false) {
    const notRunnable = [];
    const runnable = [];
    for (const project of projects) {
        if (project_graph_utils_1.projectHasTarget(project, target)) {
            runnable.push(project);
        }
        else if (project_graph_1.isWorkspaceProject(project)) {
            notRunnable.push(project);
        }
    }
    if (strict && notRunnable.length) {
        output_1.output.warn({
            title: `the following do not have configuration for "${target}"`,
            bodyLines: notRunnable.map((p) => '- ' + p.name),
        });
    }
    return runnable;
}
//# sourceMappingURL=run-many.js.map