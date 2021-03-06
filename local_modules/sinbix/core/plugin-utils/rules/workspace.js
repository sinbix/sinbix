"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultCollection = void 0;
const workspace_1 = require("../workspace");
/**
 * Sets the default collection to the provided collection name
 * The collection name is only set in case the current defaultCollection is undefined or set to '@sinbix/common'
 * @param collectionName Name of the collection to be set as defaultCollection
 */
function setDefaultCollection(collectionName) {
    return workspace_1.updateWorkspace((workspace) => {
        workspace.extensions.cli = workspace.extensions.cli || {};
        const defaultCollection = workspace.extensions.cli &&
            workspace.extensions.cli.defaultCollection;
        if (!defaultCollection || defaultCollection === '@sinbix/common') {
            workspace.extensions
                .cli.defaultCollection = collectionName;
        }
    });
}
exports.setDefaultCollection = setDefaultCollection;
//# sourceMappingURL=workspace.js.map