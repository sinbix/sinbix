const fs = require('fs-extra');

fs.removeSync('local_modules/plugins/node');

fs.copySync('dist/plugins/node', 'local_modules/plugins/node');

