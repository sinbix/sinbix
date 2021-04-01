import * as path from 'path';
import * as webpack from 'webpack';

export default (config: webpack.Configuration) => {
  config.resolve.alias['@sinbix-angular/material/theming'] = path.resolve(
    __dirname,
    '../../packages/packages/angular/material/_theming'
  );
  return config;
};
