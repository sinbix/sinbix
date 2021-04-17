"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTsConfig = void 0;
const core_1 = require("@angular-devkit/core");
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
function updateTsConfig(options) {
    return (host) => {
        const projectConfig = options.projectConfig;
        if (!host.exists(core_1.join(projectConfig.root, 'tsconfig.json'))) {
            throw new Error(`Expected ${core_1.join(projectConfig.root, 'tsconfig.json')} to exist. Please create one.`);
        }
        return plugin_utils_1.updateJsonInTree(core_1.join(projectConfig.root, 'tsconfig.json'), (json) => {
            if (json.references) {
                json.references.push({
                    path: './tsconfig.spec.json',
                });
            }
            return json;
        });
    };
}
exports.updateTsConfig = updateTsConfig;
//# sourceMappingURL=update-tsconfig.js.map