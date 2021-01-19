const fs = require('fs-extra');

fs.copySync(
  'dist/packages/dep-graph',
  'dist/packages/core/src/dep-graph'
);
