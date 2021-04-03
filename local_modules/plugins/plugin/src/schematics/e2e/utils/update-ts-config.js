"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTsConfig = void 0;
const utils_1 = require("@sinbix/utils");
const path_1 = require("path");
function updateTsConfig(options) {
    return utils_1.updateJsonInTree(path_1.join(options.projectRoot, 'tsconfig.json'), (json) => {
        json.include = ['**/*.ts'];
        return json;
    });
}
exports.updateTsConfig = updateTsConfig;
//# sourceMappingURL=update-ts-config.js.map