"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDefaultCollection = exports.getCollection = void 0;
const tslib_1 = require("tslib");
const schematics_1 = require("@angular-devkit/schematics");
function getCollection(workflow, name) {
    const collection = workflow.engine.createCollection(name);
    if (!collection)
        throw new Error(`Cannot find collection '${name}'`);
    return collection;
}
exports.getCollection = getCollection;
function readDefaultCollection(host) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const workspace = (_a = new schematics_1.HostTree(host).read('angular.json')) === null || _a === void 0 ? void 0 : _a.toString();
        const workspaceJson = workspace ? JSON.parse(workspace) : null;
        return (workspaceJson === null || workspaceJson === void 0 ? void 0 : workspaceJson.cli) ? workspaceJson.cli.defaultCollection : null;
    });
}
exports.readDefaultCollection = readDefaultCollection;
//# sourceMappingURL=collection.js.map