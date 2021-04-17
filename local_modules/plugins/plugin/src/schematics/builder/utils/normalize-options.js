"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
function normalizeOptions(host, options) {
    const normalizedProjectConfig = plugin_utils_1.normalizeProjectConfig(host, options.project);
    const npmScope = plugin_utils_1.getNpmScope(host);
    const fileName = plugin_utils_1.toFileName(options.name);
    let description;
    if (options.description) {
        description = options.description;
    }
    else {
        description = `${options.name} builder`;
    }
    return Object.assign(Object.assign(Object.assign({}, options), normalizedProjectConfig), { fileName,
        description,
        npmScope });
}
exports.normalizeOptions = normalizeOptions;
//# sourceMappingURL=normalize-options.js.map