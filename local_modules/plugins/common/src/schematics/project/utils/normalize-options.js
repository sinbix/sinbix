"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const utils_1 = require("@sinbix/utils");
function normalizeOptions(host, options) {
    return Object.assign(Object.assign(Object.assign({}, options), utils_1.normalizeProject(options)), { projectDependencies: options.dependencies
            ? options.dependencies.split(',').map((s) => s.trim())
            : [] });
}
exports.normalizeOptions = normalizeOptions;
//# sourceMappingURL=normalize-options.js.map