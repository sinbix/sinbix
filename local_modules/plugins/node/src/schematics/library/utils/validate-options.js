"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOptions = void 0;
const schematics_1 = require("@angular-devkit/schematics");
function validateOptions(host, options) {
    if (options.publishable && !options.importPath) {
        throw new schematics_1.SchematicsException(`For publishable libs you have to provide a proper "--importPath" which needs to be a valid npm package name (e.g. my-awesome-lib or @myorg/my-lib)`);
    }
}
exports.validateOptions = validateOptions;
//# sourceMappingURL=validate-options.js.map