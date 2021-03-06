"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodeWebpackConfig = void 0;
const webpack_merge_1 = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const config_1 = require("./config");
function getNodeWebpackConfig(options) {
    return webpack_merge_1.default([
        config_1.getBaseWebpackPartial(options),
        getNodePartial(options),
    ]);
}
exports.getNodeWebpackConfig = getNodeWebpackConfig;
function getNodePartial(options) {
    const webpackConfig = {
        output: {
            libraryTarget: 'commonjs',
        },
        target: 'node',
        node: false,
    };
    if (options.optimization) {
        webpackConfig.optimization = {
            minimize: false,
            concatenateModules: false,
        };
    }
    if (options.externalDependencies === 'all') {
        webpackConfig.externals = [nodeExternals()];
    }
    else if (Array.isArray(options.externalDependencies)) {
        webpackConfig.externals = [
            function (context, request, callback) {
                if (options.externalDependencies.includes(request)) {
                    // not bundled
                    return callback(null, 'commonjs ' + request);
                }
                // bundled
                callback();
            },
        ];
    }
    return webpackConfig;
}
//# sourceMappingURL=get-node-webpack-config.js.map