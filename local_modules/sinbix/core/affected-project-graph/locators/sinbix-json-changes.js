"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTouchedProjectsInSinbixJson = void 0;
const file_utils_1 = require("../../file-utils");
const json_diff_1 = require("../../utils/json-diff");
exports.getTouchedProjectsInSinbixJson = (touchedFiles, workspaceJson, sinbixJson) => {
    const sinbixJsonChange = touchedFiles.find((change) => change.file === 'sinbix.json');
    if (!sinbixJsonChange) {
        return [];
    }
    const changes = sinbixJsonChange.getChanges();
    if (changes.some((change) => {
        if (json_diff_1.isJsonChange(change)) {
            return change.path[0] !== 'projects';
        }
        if (file_utils_1.isWholeFileChange(change)) {
            return true;
        }
        return false;
    })) {
        return Object.keys(sinbixJson.projects);
    }
    const touched = [];
    for (let i = 0; i < changes.length; i++) {
        const change = changes[i];
        if (!json_diff_1.isJsonChange(change) || change.path[0] !== 'projects') {
            continue;
        }
        // Only look for changes that are changes to the whole project definition
        if (change.path.length !== 2) {
            continue;
        }
        switch (change.type) {
            case json_diff_1.DiffType.Deleted: {
                // We are not sure which projects used to depend on a deleted project
                // so return all projects to be safe
                return Object.keys(sinbixJson.projects);
            }
            default: {
                // Add the project name
                touched.push(change.path[1]);
            }
        }
    }
    return touched;
};
//# sourceMappingURL=sinbix-json-changes.js.map