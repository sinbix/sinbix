"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSinbix = void 0;
const utils_1 = require("@sinbix/core/plugin-utils");
function updateSinbix(options) {
    return utils_1.updateSinbixJsonInTree((json) => {
        json.projects[options.projectName].implicitDependencies = [
            options.pluginName,
        ];
        return json;
    });
}
exports.updateSinbix = updateSinbix;
//# sourceMappingURL=update-sinbix.js.map