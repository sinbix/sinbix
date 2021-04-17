"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBuilders = void 0;
const utils_1 = require("@sinbix/core/plugin-utils");
const path_1 = require("path");
function updateBuilders(options) {
    return utils_1.updateJsonInTree(path_1.join(options.projectConfig.root, 'builders.json'), (json) => {
        json.builders[options.name] = {
            implementation: `./builders/${options.name}/builder`,
            schema: `./builders/${options.name}/schema.json`,
            description: options.description,
        };
        return json;
    });
}
exports.updateBuilders = updateBuilders;
//# sourceMappingURL=update-builders.js.map