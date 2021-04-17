"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
const plugin_utils_2 = require("@sinbix/core/plugin-utils");
function normalizeOptions(host, options) {
    const projectConfig = plugin_utils_1.getProjectConfig(host, options.pluginName);
    const normalizedProject = plugin_utils_2.normalizeProject({
        name: projectConfig.root,
        directory: options.directory,
        tags: "e2e",
    });
    const npmScope = plugin_utils_1.getNpmScope(host);
    return Object.assign(Object.assign(Object.assign({}, options), normalizedProject), { npmScope });
}
exports.normalizeOptions = normalizeOptions;
//# sourceMappingURL=normalize-options.js.map