"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sinbixDepsInstall = void 0;
const detect_package_manager_1 = require("@sinbix/core/utils/detect-package-manager");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
const common_1 = require("./common");
const paths_1 = require("./paths");
function sinbixDepsInstall(project, deps, silent = true) {
    for (const dep of deps) {
        patchPackageJsonForPlugin(project, dep);
    }
    runPackageManagerInstall(project, silent);
}
exports.sinbixDepsInstall = sinbixDepsInstall;
function patchPackageJsonForPlugin(project, dep) {
    const { npmPackageName, distPath, projectName } = dep;
    child_process_1.execSync(`npx sinbix build ${projectName}`);
    const p = JSON.parse(fs_1.readFileSync(paths_1.tmpProjPath(project, 'package.json')).toString());
    const depPath = `${rootPath(process.cwd())}/${distPath}`;
    p.devDependencies[npmPackageName] = `file:${depPath}`;
    child_process_1.execSync(`npm i --prefix ${depPath}  --no-package-lock`);
    fs_1.writeFileSync(paths_1.tmpProjPath(project, 'package.json'), JSON.stringify(p, null, 2));
}
function rootPath(dir) {
    if (common_1.fileExists(path_1.join(dir, 'angular.json'))) {
        return dir;
    }
    else {
        return rootPath(path_1.dirname(dir));
    }
}
function runPackageManagerInstall(project, silent = true) {
    const packageManager = detect_package_manager_1.detectPackageManager();
    const install = child_process_1.execSync(`${packageManager} install`, Object.assign({ cwd: paths_1.tmpProjPath(project) }, (silent ? { stdio: ['ignore', 'ignore', 'ignore'] } : {})));
    return install ? install.toString() : '';
}
//# sourceMappingURL=sinbix-deps-install.js.map