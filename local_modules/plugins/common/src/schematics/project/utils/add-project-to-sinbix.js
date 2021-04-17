"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProjectToSinbix = void 0;
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
function addProjectToSinbix(options) {
    return plugin_utils_1.addProjectToSinbixJsonInTree(options.projectName, {
        tags: options.projectTags,
        implicitDependencies: options.projectDependencies,
    });
}
exports.addProjectToSinbix = addProjectToSinbix;
//# sourceMappingURL=add-project-to-sinbix.js.map