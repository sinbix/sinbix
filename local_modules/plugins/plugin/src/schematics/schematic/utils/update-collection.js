"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCollection = void 0;
const path_1 = require("path");
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
function updateCollection(options) {
    return plugin_utils_1.updateJsonInTree(path_1.join(options.projectConfig.root, 'collection.json'), (json) => {
        json.schematics[options.name] = {
            factory: `./schematics/${options.name}/schematic`,
            schema: `./schematics/${options.name}/schema.json`,
            description: options.description,
        };
        return json;
    });
}
exports.updateCollection = updateCollection;
//# sourceMappingURL=update-collection.js.map