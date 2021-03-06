"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTouchedNpmPackages = void 0;
const file_utils_1 = require("../../file-utils");
const json_diff_1 = require("../../utils/json-diff");
exports.getTouchedNpmPackages = (touchedFiles, workspaceJson, sinbixJson, packageJson, projectGraph) => {
    const packageJsonChange = touchedFiles.find((f) => f.file === 'package.json');
    if (!packageJsonChange)
        return [];
    let touched = [];
    const changes = packageJsonChange.getChanges();
    const npmPackages = Object.values(projectGraph.nodes).filter((node) => node.type === 'npm');
    for (const c of changes) {
        if (json_diff_1.isJsonChange(c) &&
            (c.path[0] === 'dependencies' || c.path[0] === 'devDependencies') &&
            c.path.length === 2) {
            // A package was deleted so mark all workspace projects as touched.
            if (c.type === json_diff_1.DiffType.Deleted) {
                touched = Object.keys(workspaceJson.projects);
                break;
            }
            else {
                touched.push(npmPackages.find((pkg) => pkg.data.packageName === c.path[1]).name);
            }
        }
        else if (file_utils_1.isWholeFileChange(c)) {
            // Whole file was touched, so all npm packages are touched.
            touched = npmPackages.map((pkg) => pkg.name);
            break;
        }
    }
    return touched;
};
//# sourceMappingURL=npm-packages.js.map