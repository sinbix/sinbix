"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
function normalizeOptions(host, options) {
    const normalizedProject = plugin_utils_1.normalizeProject(options);
    const defaultPrefix = plugin_utils_1.getNpmScope(host);
    const importPath = options.importPath || `@${defaultPrefix}/${normalizedProject.projectRoot}`;
    return Object.assign(Object.assign(Object.assign({}, options), normalizedProject), { importPath });
}
exports.normalizeOptions = normalizeOptions;
//# sourceMappingURL=normalize-options.js.map