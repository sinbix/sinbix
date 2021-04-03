"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tmpProjPath = void 0;
function tmpProjPath(tmpProjectName, path) {
    return path
        ? `${process.cwd()}/tmp/e2e/${tmpProjectName}/${path}`
        : `${process.cwd()}/tmp/e2e/${tmpProjectName}`;
}
exports.tmpProjPath = tmpProjPath;
//# sourceMappingURL=paths.js.map