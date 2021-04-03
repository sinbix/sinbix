"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureSinbixProject = void 0;
const tslib_1 = require("tslib");
const paths_1 = require("./paths");
const fs_extra_1 = require("fs-extra");
const new_sinbix_project_1 = require("./new-sinbix-project");
function ensureSinbixProject(project, args, silent = false) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        fs_extra_1.ensureDirSync(paths_1.tmpProjPath(project));
        yield new_sinbix_project_1.newSinbixProject(project, args, silent);
    });
}
exports.ensureSinbixProject = ensureSinbixProject;
//# sourceMappingURL=create-sinbix-project.js.map