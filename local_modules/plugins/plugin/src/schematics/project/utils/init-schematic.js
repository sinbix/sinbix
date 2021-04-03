"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSchematic = void 0;
const schematics_1 = require("@angular-devkit/schematics");
function initSchematic(options) {
    return schematics_1.chain([
        !options.skipInit
            ? schematics_1.schematic('schematic', {
                project: options.projectName,
                name: options.projectName,
                unitTestRunner: options.unitTestRunner,
            })
            : schematics_1.noop(),
    ]);
}
exports.initSchematic = initSchematic;
//# sourceMappingURL=init-schematic.js.map