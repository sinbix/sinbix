"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDependencies = void 0;
const project_graph_1 = require("@sinbix/core/project-graph");
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
const ignore_1 = require("ignore");
const path = require("path");
function checkDependencies(options) {
    if (options.forceRemove) {
        return (tree) => tree;
    }
    let ig = ignore_1.default();
    return (host) => {
        if (host.exists('.gitignore')) {
            ig = ig.add(host.read('.gitignore').toString());
        }
        const files = [];
        const workspaceDir = path.dirname(plugin_utils_1.getWorkspacePath(host));
        for (const dir of host.getDir('/').subdirs) {
            if (ig.ignores(dir)) {
                continue;
            }
            host.getDir(dir).visit((file) => {
                files.push({
                    file: path.relative(workspaceDir, file),
                    ext: path.extname(file),
                    hash: '',
                });
            });
        }
        const graph = project_graph_1.createProjectGraph(plugin_utils_1.readWorkspace(host), plugin_utils_1.readSinbixJsonInTree(host), files, (file) => {
            try {
                return host.read(file).toString('utf-8');
            }
            catch (e) {
                throw new Error(`Could not read ${file}`);
            }
        }, false, false);
        const reverseGraph = project_graph_1.onlyWorkspaceProjects(project_graph_1.reverse(graph));
        const deps = reverseGraph.dependencies[options.projectName] || [];
        if (deps.length === 0) {
            return host;
        }
        throw new Error(`${options.projectName} is still depended on by the following projects:\n${deps
            .map((x) => x.target)
            .join('\n')}`);
    };
}
exports.checkDependencies = checkDependencies;
//# sourceMappingURL=check-dependencies.js.map