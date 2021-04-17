"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("@sinbix/core/plugin-utils");
const utils_2 = require("./utils");
function default_1(options) {
    return (host) => {
        const normalizedOptions = utils_2.normalizeOptions(host, options);
        utils_2.validateOptions(host, normalizedOptions);
        return schematics_1.chain([
            utils_2.addNodeProject(normalizedOptions),
            utils_2.addLint(normalizedOptions),
            utils_2.addJest(normalizedOptions),
            utils_2.addFiles(normalizedOptions),
            utils_2.updateTsConfig(normalizedOptions),
            utils_2.updateTsBaseConfig(normalizedOptions),
            utils_2.buildBuilder(normalizedOptions),
            utils_1.formatFiles(),
        ]);
    };
}
exports.default = default_1;
//# sourceMappingURL=schematic.js.map