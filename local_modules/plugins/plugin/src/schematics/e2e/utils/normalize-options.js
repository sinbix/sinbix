"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const utils_1 = require("@sinbix/utils");
const utils_2 = require("@sinbix/utils");
function normalizeOptions(host, options) {
    const projectConfig = utils_1.getProjectConfig(host, options.pluginName);
    const normalizedProject = utils_2.normalizeProject({
        name: projectConfig.root,
        directory: options.directory,
        tags: "e2e",
    });
    const npmScope = utils_1.getNpmScope(host);
    return Object.assign(Object.assign(Object.assign({}, options), normalizedProject), { npmScope });
}
exports.normalizeOptions = normalizeOptions;
//# sourceMappingURL=normalize-options.js.map