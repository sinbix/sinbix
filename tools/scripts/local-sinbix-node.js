const fs = require('fs-extra');

fs.copySync('dist/plugins/node', 'local_modules/plugins/node');
