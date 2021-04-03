"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("./utils");
function default_1(options) {
    return (host) => {
        const normalizedOptions = utils_1.normalizeOptions(host, options);
        return schematics_1.chain([
            utils_1.initLint(),
            utils_1.lintBuilder(normalizedOptions),
            utils_1.addFiles(normalizedOptions),
        ]);
    };
}
exports.default = default_1;
//# sourceMappingURL=schematic.js.map