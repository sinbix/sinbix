"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("./utils");
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
function default_1(options) {
    return (host) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const normalizedOptions = utils_1.normalizeOptions(host, options);
        utils_1.validatePlugin(host, normalizedOptions);
        return schematics_1.chain([
            utils_1.nodeProject(normalizedOptions),
            utils_1.addFiles(normalizedOptions),
            utils_1.e2eBuilder(normalizedOptions),
            utils_1.updateSinbix(normalizedOptions),
            utils_1.addJest(normalizedOptions),
            utils_1.updateTsConfig(normalizedOptions),
            plugin_utils_1.formatFiles()
        ]);
    });
}
exports.default = default_1;
//# sourceMappingURL=schematic.js.map