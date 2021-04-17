"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
function normalizeOptions(host, options) {
    if (options.testEnvironment === 'jsdom') {
        options.testEnvironment = '';
    }
    // if we support TSX we don't support angular(html templates)
    if (options.supportTsx) {
        options.skipSerializers = true;
    }
    const projectConfig = plugin_utils_1.normalizeProjectConfig(host, options.project);
    return Object.assign(Object.assign({}, options), projectConfig);
}
exports.normalizeOptions = normalizeOptions;
//# sourceMappingURL=normalize-options.js.map