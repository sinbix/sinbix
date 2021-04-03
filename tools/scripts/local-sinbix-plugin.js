const fs = require('fs-extra');

fs.copySync('dist/packages/plugins/plugin', 'local_modules/plugins/plugin');
