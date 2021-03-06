"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectRoots = exports.parseFiles = void 0;
const child_process_1 = require("child_process");
const file_utils_1 = require("../file-utils");
function parseFiles(options) {
    const { files, uncommitted, untracked, base, head } = options;
    if (files) {
        return {
            files,
        };
    }
    else if (uncommitted) {
        return {
            files: getUncommittedFiles(),
        };
    }
    else if (untracked) {
        return {
            files: getUntrackedFiles(),
        };
    }
    else if (base && head) {
        return {
            files: getFilesUsingBaseAndHead(base, head),
        };
    }
    else if (base) {
        return {
            files: Array.from(new Set([
                ...getFilesUsingBaseAndHead(base, 'HEAD'),
                ...getUncommittedFiles(),
                ...getUntrackedFiles(),
            ])),
        };
    }
}
exports.parseFiles = parseFiles;
function getUncommittedFiles() {
    return parseGitOutput(`git diff --name-only --relative HEAD .`);
}
function getUntrackedFiles() {
    return parseGitOutput(`git ls-files --others --exclude-standard`);
}
function getFilesUsingBaseAndHead(base, head) {
    const mergeBase = child_process_1.execSync(`git merge-base ${base} ${head}`, {
        maxBuffer: file_utils_1.TEN_MEGABYTES,
    })
        .toString()
        .trim();
    return parseGitOutput(`git diff --name-only --relative ${mergeBase} ${head}`);
}
function parseGitOutput(command) {
    return child_process_1.execSync(command, { maxBuffer: file_utils_1.TEN_MEGABYTES })
        .toString('utf-8')
        .split('\n')
        .map((a) => a.trim())
        .filter((a) => a.length > 0);
}
function getProjectRoots(projectNames) {
    const { projects } = file_utils_1.readWorkspaceJson();
    return projectNames.map((name) => projects[name].root);
}
exports.getProjectRoots = getProjectRoots;
//# sourceMappingURL=shared.js.map