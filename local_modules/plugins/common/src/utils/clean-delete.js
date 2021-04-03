"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanDelete = void 0;
const path_1 = require("path");
function cleanDelete(path) {
    return (host) => {
        host.delete(definePath(host, path));
    };
}
exports.cleanDelete = cleanDelete;
function definePath(host, path) {
    var _a, _b;
    const cutPath = path_1.normalize(path_1.join(path, '..'));
    const dir = host.getDir(cutPath);
    if (((_a = dir.subfiles) === null || _a === void 0 ? void 0 : _a.length) || ((_b = dir.subdirs) === null || _b === void 0 ? void 0 : _b.length) > 1) {
        return path;
    }
    else {
        return definePath(host, cutPath);
    }
}
//# sourceMappingURL=clean-delete.js.map