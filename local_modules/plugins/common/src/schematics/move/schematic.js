"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("./utils");
const utils_2 = require("@sinbix/utils");
function default_1(options) {
    const normalizedOptions = utils_1.normalizeOptions(options);
    return schematics_1.chain([
        utils_2.checkProjectExists(normalizedOptions),
        utils_1.checkDestination(normalizedOptions),
        utils_1.runMover(normalizedOptions),
    ]);
}
exports.default = default_1;
//# sourceMappingURL=schematic.js.map