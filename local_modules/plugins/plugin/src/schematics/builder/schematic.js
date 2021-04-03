"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("./utils");
function default_1(schema) {
    return (host) => {
        const options = utils_1.normalizeOptions(host, schema);
        return schematics_1.chain([utils_1.addFiles(options), utils_1.updateBuilders(options)]);
    };
}
exports.default = default_1;
//# sourceMappingURL=schematic.js.map