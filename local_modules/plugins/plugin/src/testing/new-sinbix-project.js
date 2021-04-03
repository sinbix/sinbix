"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newSinbixProject = void 0;
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const common_1 = require("./common");
function newSinbixProject(project, args, silent = false) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        common_1.cleanup(project);
        yield runSinbixNewCommand(project, args, silent);
    });
}
exports.newSinbixProject = newSinbixProject;
function runSinbixNewCommand(project, args, silent = false) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const localTmpDir = 'tmp/e2e';
        return child_process_1.execSync(`npx sinbix new ${project} --no-interactive --skip-install --npmScope=${project} ${args || ''}`, Object.assign({ cwd: localTmpDir }, (silent && false ? { stdio: ['ignore', 'ignore', 'ignore'] } : {})));
    });
}
//# sourceMappingURL=new-sinbix-project.js.map