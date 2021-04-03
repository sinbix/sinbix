"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addJest = void 0;
const schematics_1 = require("@angular-devkit/schematics");
function addJest(options) {
    return options.unitTestRunner === 'jest'
        ? schematics_1.chain([
            schematics_1.externalSchematic('@sinbix/node', 'jest', {
                project: options.projectName,
                setupFile: 'none',
                supportTsx: true,
                skipSerializers: true,
                testEnvironment: options.testEnvironment,
                testTimeout: options.testTimeout,
            }),
        ])
        : schematics_1.noop();
}
exports.addJest = addJest;
//# sourceMappingURL=add-jest.js.map