const fs = require('fs-extra');

fs.copySync('dist/sinbix/ng/apps/dep-graph', 'dist/sinbix/core/src/dep-graph');
