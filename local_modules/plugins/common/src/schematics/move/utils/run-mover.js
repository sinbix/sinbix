"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMover = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
function runMover(options) {
    return (host) => {
        const projectMover = plugin_utils_1.readJsonInTree(host, 'sinbix.json').projects[options.projectName].mover;
        const mover = projectMover !== null && projectMover !== void 0 ? projectMover : '@sinbix/common:project-mover';
        const parts = mover.split(':');
        return schematics_1.externalSchematic(parts[0], parts[1], options);
    };
}
exports.runMover = runMover;
//# sourceMappingURL=run-mover.js.map