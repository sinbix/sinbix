"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceResults = void 0;
const fs = require("fs");
const fileutils_1 = require("../utils/fileutils");
const fs_1 = require("fs");
const path_1 = require("path");
const fsExtra = require("fs-extra");
const app_root_1 = require("../utils/app-root");
const resultsDir = path_1.join(app_root_1.appRootPath, 'node_modules', '.cache', 'sinbix');
const resultsFile = path_1.join(resultsDir, 'results.json');
class WorkspaceResults {
    constructor(command, projects) {
        this.command = command;
        this.projects = projects;
        this.commandResults = {
            command: this.command,
            results: {},
        };
        const resultsExists = fs.existsSync(resultsFile);
        this.startedWithFailedProjects = false;
        if (resultsExists) {
            try {
                const commandResults = fileutils_1.readJsonFile(resultsFile);
                this.startedWithFailedProjects = commandResults.command === command;
                if (this.startedWithFailedProjects) {
                    this.commandResults = commandResults;
                    this.invalidateOldResults();
                }
            }
            catch (_a) {
                /**
                 * If we got here it is likely that RESULTS_FILE is not valid JSON.
                 * It is safe to continue, and it does not make much sense to give the
                 * user feedback as the file will be updated automatically.
                 */
            }
        }
    }
    get failedProjects() {
        return Object.entries(this.commandResults.results)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, result]) => !result)
            .map(([project]) => project);
    }
    get hasFailure() {
        return Object.values(this.commandResults.results).some((result) => !result);
    }
    getResult(projectName) {
        return this.commandResults.results[projectName];
    }
    saveResults() {
        try {
            if (!fs_1.existsSync(resultsDir)) {
                fsExtra.ensureDirSync(resultsDir);
            }
        }
        catch (e) {
            if (!fileutils_1.directoryExists(resultsDir)) {
                throw new Error(`Failed to create directory: ${resultsDir}`);
            }
        }
        if (Object.values(this.commandResults.results).includes(false)) {
            fileutils_1.writeJsonFile(resultsFile, this.commandResults);
        }
        else if (fs.existsSync(resultsFile)) {
            fs_1.unlinkSync(resultsFile);
        }
    }
    setResult(projectName, result) {
        this.commandResults.results[projectName] = result;
    }
    invalidateOldResults() {
        Object.keys(this.commandResults.results).forEach((projectName) => {
            if (!this.projects[projectName]) {
                delete this.commandResults.results[projectName];
            }
        });
    }
}
exports.WorkspaceResults = WorkspaceResults;
//# sourceMappingURL=workspace-results.js.map