"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runOne = void 0;
const tslib_1 = require("tslib");
const run_command_1 = require("../tasks-runner/run-command");
const project_graph_1 = require("../project-graph");
const file_utils_1 = require("../file-utils");
const empty_reporter_1 = require("../tasks-runner/empty-reporter");
const utils_1 = require("./utils");
const project_graph_utils_1 = require("../utils/project-graph-utils");
function runOne(opts) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { sinbixArgs, overrides } = utils_1.splitArgsIntoSinbixArgsAndOverrides(Object.assign(Object.assign({}, opts.parsedArgs), { configuration: opts.configuration, target: opts.target }), 'run-one');
        const projectGraph = project_graph_1.createProjectGraph();
        const { projects, projectsMap } = yield getProjects(projectGraph, sinbixArgs.withDeps, opts.project, opts.target);
        const env = file_utils_1.readEnvironment(opts.target, projectsMap);
        const reporter = sinbixArgs.withDeps
            ? new ((yield Promise.resolve().then(() => require(`@sinbix/core/tasks-runner/run-one-reporter`))).RunOneReporter)(opts.project)
            : new empty_reporter_1.EmptyReporter();
        yield run_command_1.runCommand(projects, projectGraph, env, sinbixArgs, overrides, reporter, opts.project);
    });
}
exports.runOne = runOne;
function getProjects(projectGraph, includeDeps, project, target) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const projects = [projectGraph.nodes[project]];
        const projectsMap = {
            [project]: projectGraph.nodes[project],
        };
        if (includeDeps) {
            const s = yield Promise.resolve().then(() => require(`@sinbix/core/project-graph`));
            const deps = s.onlyWorkspaceProjects(s.withDeps(projectGraph, projects))
                .nodes;
            const projectsWithTarget = Object.values(deps).filter((p) => project_graph_utils_1.projectHasTarget(p, target));
            return {
                projects: projectsWithTarget,
                projectsMap: deps,
            };
        }
        else {
            return { projects, projectsMap };
        }
    });
}
//# sourceMappingURL=run-one.js.map