const fs = require('fs-extra');

fs.copySync(
  'dist/packages/apps/deps-graph/app',
  'dist/packages/sinbix/core/src/dep-graph'
);
