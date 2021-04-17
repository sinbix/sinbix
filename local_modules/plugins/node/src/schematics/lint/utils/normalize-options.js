"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const utils_1 = require("@sinbix/core/plugin-utils");
function normalizeOptions(host, options) {
    const projectConfig = utils_1.normalizeProjectConfig(host, options.project);
    return Object.assign(Object.assign({}, options), projectConfig);
}
exports.normalizeOptions = normalizeOptions;
//# sourceMappingURL=normalize-options.js.map