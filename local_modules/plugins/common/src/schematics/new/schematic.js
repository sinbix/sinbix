"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("./utils");
function default_1(options) {
    const normalizedOptions = utils_1.normalizeOptions(options);
    const workspaceOpts = Object.assign(Object.assign({}, normalizedOptions), { layout: 'apps-and-libs', preset: undefined });
    return (host, context) => {
        return schematics_1.chain([
            schematics_1.schematic('workspace', Object.assign({}, workspaceOpts)),
            schematics_1.move('/', normalizedOptions.directory),
            utils_1.addTasks(normalizedOptions),
        ])(schematics_1.Tree.empty(), context);
    };
}
exports.default = default_1;
//# sourceMappingURL=schematic.js.map