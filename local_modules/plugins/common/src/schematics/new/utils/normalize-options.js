"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
function normalizeOptions(options) {
    if (!options.directory) {
        options.directory = options.name;
    }
    return Object.assign(Object.assign({}, options), { name: plugin_utils_1.toFileName(options.name), directory: options.directory || options.name });
}
exports.normalizeOptions = normalizeOptions;
//# sourceMappingURL=normalize-options.js.map