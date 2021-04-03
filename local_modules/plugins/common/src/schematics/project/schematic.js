"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("./utils");
exports.default = (options) => {
    return (host) => {
        const normalizedOptions = utils_1.normalizeOptions(host, options);
        return schematics_1.chain([
            utils_1.addProjectToWorkspace(normalizedOptions),
            utils_1.addProjectToSinbix(normalizedOptions),
            utils_1.gitkeep(normalizedOptions),
        ]);
    };
};
//# sourceMappingURL=schematic.js.map