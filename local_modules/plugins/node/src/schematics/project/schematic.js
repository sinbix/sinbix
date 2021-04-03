"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("./utils");
function default_1(options) {
    return (host) => {
        const normalizedOptions = utils_1.normalizeOptions(host, options);
        return schematics_1.chain([
            schematics_1.externalSchematic('@sinbix/common', 'project', {
                directory: '',
                name: normalizedOptions.projectRoot,
                sourceRoot: normalizedOptions.sourceRoot,
                tags: normalizedOptions.projectTags.join(','),
                type: normalizedOptions.type,
            }),
            utils_1.addFiles(normalizedOptions),
        ]);
    };
}
exports.default = default_1;
//# sourceMappingURL=schematic.js.map