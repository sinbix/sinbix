"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuilderProjectData = exports.createBuilderHost = exports.createHost = void 0;
const core_1 = require("@angular-devkit/core");
const node_1 = require("@angular-devkit/core/node");
const schematics_1 = require("@angular-devkit/schematics");
const ast_utils_1 = require("./ast-utils");
function createHost(workspaceRoot) {
    return new schematics_1.HostTree(new core_1.virtualFs.ScopedHost(new node_1.NodeJsSyncHost(), core_1.normalize(workspaceRoot)));
}
exports.createHost = createHost;
function createBuilderHost(context) {
    return createHost(context.workspaceRoot);
}
exports.createBuilderHost = createBuilderHost;
function getBuilderProjectData(context) {
    var _a, _b, _c;
    return (_c = (_a = ast_utils_1.getProjectGraphFromHost(createBuilderHost(context))) === null || _a === void 0 ? void 0 : _a.nodes[(_b = context.target) === null || _b === void 0 ? void 0 : _b.project]) === null || _c === void 0 ? void 0 : _c.data;
}
exports.getBuilderProjectData = getBuilderProjectData;
//# sourceMappingURL=builder.js.map