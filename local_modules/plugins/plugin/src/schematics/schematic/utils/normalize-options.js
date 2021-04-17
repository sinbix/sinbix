"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
function normalizeOptions(host, options) {
    const normalizedProjectConfig = plugin_utils_1.normalizeProjectConfig(host, options.project);
    const npmScope = plugin_utils_1.getNpmScope(host);
    const fileName = plugin_utils_1.toFileName(options.name);
    const npmPackageName = `@${npmScope}/${fileName}`;
    let description;
    if (options.description) {
        description = options.description;
    }
    else {
        description = `${options.name} schematic`;
    }
    return Object.assign(Object.assign(Object.assign({}, options), normalizedProjectConfig), { fileName,
        description,
        npmScope,
        npmPackageName });
}
exports.normalizeOptions = normalizeOptions;
//# sourceMappingURL=normalize-options.js.map