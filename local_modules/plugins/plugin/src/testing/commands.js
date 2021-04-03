"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSinbixCommand = exports.runSinbixCommandAsync = void 0;
const child_process_1 = require("child_process");
const paths_1 = require("./paths");
const detect_package_manager_1 = require("@sinbix/core/src/utils/detect-package-manager");
function runSinbixCommandAsync(project, command, silent = false) {
    return new Promise((resolve, reject) => {
        child_process_1.exec(`${detect_package_manager_1.getPackageManagerExecuteCommand()} sinbix ${command}`, {
            cwd: paths_1.tmpProjPath(project),
        }, (err, stdout, stderr) => {
            if (!silent && err) {
                reject(err);
            }
            resolve({ stdout, stderr });
        });
    });
}
exports.runSinbixCommandAsync = runSinbixCommandAsync;
function runSinbixCommand(project, command, silent = false) {
    try {
        return child_process_1.execSync(`${detect_package_manager_1.getPackageManagerExecuteCommand()} sinbix ${command}`, {
            cwd: paths_1.tmpProjPath(project),
        })
            .toString()
            .replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
    }
    catch (e) {
        if (silent) {
            return e.stdout.toString();
        }
        else {
            console.log(e.stdout.toString(), e.stderr.toString());
            throw e;
        }
    }
}
exports.runSinbixCommand = runSinbixCommand;
//# sourceMappingURL=commands.js.map