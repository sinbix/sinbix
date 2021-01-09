const fs = require('fs-extra');

fs.copySync(
  'dist/packages/dep-graph',
  'dist/packages/devkit/src/workspace/core/dep-graph'
);
