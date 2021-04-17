"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDestination = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const plugin_utils_1 = require("@sinbix/core/plugin-utils");
/**
 * Checks whether the destination folder is valid
 *
 * - must not be outside the workspace
 * - must be a new folder
 *
 * @param options The options provided to the schematic
 */
function checkDestination(options) {
    return (tree) => {
        const INVALID_DESTINATION = `Invalid destination: [${options.destination}]`;
        if (options.destination.includes('..')) {
            throw new schematics_1.SchematicsException(`${INVALID_DESTINATION} - Please specify explicit path.`);
        }
        const destination = plugin_utils_1.getDestination(options.destination);
        if (tree.getDir(destination).subfiles.length > 0) {
            throw new schematics_1.SchematicsException(`${INVALID_DESTINATION} - Path is not empty.`);
        }
        if (options.destination.startsWith('/')) {
            options.destination = plugin_utils_1.normalizeSlashes(options.destination.substr(1));
        }
    };
}
exports.checkDestination = checkDestination;
//# sourceMappingURL=check-destination.js.map