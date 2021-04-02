import { BuildBuilderOptions } from './models';
import mergeWebpack from 'webpack-merge';
import { Configuration } from 'webpack';
import * as nodeExternals from 'webpack-node-externals';
import { getBaseWebpackPartial, OUT_FILENAME } from './config';

export function getNodeWebpackConfig(options: BuildBuilderOptions) {
  return mergeWebpack([
    getBaseWebpackPartial(options),
    getNodePartial(options),
  ]);
}

function getNodePartial(options: BuildBuilderOptions) {
  const webpackConfig: Configuration = {
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
  } else if (Array.isArray(options.externalDependencies)) {
    webpackConfig.externals = [
      function (context, request, callback: Function) {
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
