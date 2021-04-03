const fs = require('fs-extra');

fs.copySync('dist/packages/plugins/node', 'local_modules/plugins/node');
