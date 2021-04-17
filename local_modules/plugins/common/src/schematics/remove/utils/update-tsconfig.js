"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTsconfig = void 0;
const utils_1 = require("@sinbix/core/plugin-utils");
const _ = require("lodash");
function updateTsconfig(options) {
    return (host) => {
        const project = utils_1.getProjectConfig(host, options.projectName);
        return utils_1.updateJsonInTree('tsconfig.base.json', (json) => {
            const c = json.compilerOptions;
            const paths = c.paths || {};
            _.keys(paths).forEach((alias) => {
                const value = paths[alias].filter((path) => !new RegExp(`^${project.root}`).test(path));
                if (paths[alias].length === value.length) {
                    return;
                }
                if (value.length > 0) {
                    paths[alias] = value;
                }
                else {
                    delete paths[alias];
                }
            });
            return json;
        });
    };
}
exports.updateTsconfig = updateTsconfig;
//# sourceMappingURL=update-tsconfig.js.map