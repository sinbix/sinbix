"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitkeep = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("@sinbix/core/plugin-utils");
function gitkeep(options) {
    return !options.skipGitkeep ? utils_1.addGitKeep(options.projectRoot) : schematics_1.noop();
}
exports.gitkeep = gitkeep;
//# sourceMappingURL=gitkeep.js.map