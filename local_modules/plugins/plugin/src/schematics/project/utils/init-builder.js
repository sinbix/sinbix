"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBuilder = void 0;
const schematics_1 = require("@angular-devkit/schematics");
function initBuilder(options) {
    return schematics_1.chain([
        !options.skipInit
            ? schematics_1.schematic('builder', {
                project: options.projectName,
                name: options.projectName,
                unitTestRunner: options.unitTestRunner,
            })
            : schematics_1.noop(),
    ]);
}
exports.initBuilder = initBuilder;
//# sourceMappingURL=init-builder.js.map