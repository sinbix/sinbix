"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLint = void 0;
const schematics_1 = require("@angular-devkit/schematics");
function addLint(options) {
    return options.linter === 'eslint'
        ? schematics_1.externalSchematic('@sinbix/node', 'lint', {
            project: options.projectName,
        })
        : schematics_1.noop;
}
exports.addLint = addLint;
//# sourceMappingURL=add-lint.js.map