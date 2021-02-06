const fs = require('fs-extra');

fs.copySync(
  'dist/packages/apps/dep-graph',
  'dist/packages/core/src/dep-graph'
);
