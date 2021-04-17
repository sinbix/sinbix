"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProjectToSinbix = void 0;
const utils_1 = require("@sinbix/core/plugin-utils");
function addProjectToSinbix(options) {
    return utils_1.addProjectToSinbixJsonInTree(options.projectName, {
        tags: options.projectTags,
        implicitDependencies: options.projectDependencies,
    });
}
exports.addProjectToSinbix = addProjectToSinbix;
//# sourceMappingURL=add-project-to-sinbix.js.map