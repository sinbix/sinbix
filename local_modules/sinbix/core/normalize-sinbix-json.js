"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeSinbixJson = void 0;
function normalizeSinbixJson(sinbixJson) {
    return sinbixJson.implicitDependencies
        ? Object.assign(Object.assign({}, sinbixJson), { implicitDependencies: Object.entries(sinbixJson.implicitDependencies).reduce((acc, [key, val]) => {
                acc[key] = recur(val);
                return acc;
                function recur(v) {
                    if (v === '*') {
                        return Object.keys(sinbixJson.projects);
                    }
                    else if (Array.isArray(v)) {
                        return v;
                    }
                    else {
                        return Object.keys(v).reduce((xs, x) => {
                            xs[x] = recur(v[x]);
                            return xs;
                        }, {});
                    }
                }
            }, {}) }) : sinbixJson;
}
exports.normalizeSinbixJson = normalizeSinbixJson;
//# sourceMappingURL=normalize-sinbix-json.js.map