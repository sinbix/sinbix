"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSinbixJson = void 0;
const utils_1 = require("@sinbix/core/plugin-utils");
function updateSinbixJson(options) {
    return utils_1.updateJsonInTree('sinbix.json', (json) => {
        delete json.projects[options.projectName];
        Object.values(json.projects).forEach((project) => {
            if (project.implicitDependencies) {
                project.implicitDependencies = project.implicitDependencies.filter((dep) => dep !== options.projectName);
            }
        });
        return json;
    });
}
exports.updateSinbixJson = updateSinbixJson;
//# sourceMappingURL=update-sinbix-json.js.map