"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGitKeep = void 0;
const path_1 = require("path");
function addGitKeep(path) {
    return (host) => {
        host.create(path_1.join(path, '.gitkeep'), '');
    };
}
exports.addGitKeep = addGitKeep;
//# sourceMappingURL=gitkeep.js.map