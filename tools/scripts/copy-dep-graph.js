const fs = require('fs-extra');

fs.copySync(
  'dist/packages/sinbix/dep-graph/app',
  'dist/sinbix/core/src/dep-graph'
);
