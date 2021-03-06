"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkProjectExists = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const workspace_1 = require("../workspace");
/**
 * Checks whether the project exists in the workspace.
 * Throws an Error if the project is not found.
 *
 * @param schema The options provided to the schematic
 */
function checkProjectExists(schema) {
    //@ts-ignore
    return (tree) => {
        return rxjs_1.from(workspace_1.getWorkspace(tree)).pipe(operators_1.map((workspace) => {
            if (!workspace.projects.has(schema.projectName)) {
                throw new Error(`Project not found in workspace: [${schema.projectName}]`);
            }
            return tree;
        }));
    };
}
exports.checkProjectExists = checkProjectExists;
//# sourceMappingURL=check-project-exists.js.map