"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
const utils_1 = require("./utils");
function default_1(options) {
    return (host) => {
        const normalizedOptions = utils_1.normalizeOptions(host, options);
        utils_1.validateOptions(host, normalizedOptions);
        return schematics_1.chain([
            utils_1.addNodeProject(normalizedOptions),
            utils_1.addLint(normalizedOptions),
            utils_1.addJest(normalizedOptions),
            utils_1.addFiles(normalizedOptions),
            utils_1.updateTsConfig(normalizedOptions),
            utils_1.updateTsBaseConfig(normalizedOptions),
            utils_1.buildBuilder(normalizedOptions),
            plugin_utils_1.formatFiles(),
        ]);
    };
}
exports.default = default_1;
//# sourceMappingURL=schematic.js.map