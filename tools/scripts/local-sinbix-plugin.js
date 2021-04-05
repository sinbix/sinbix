const fs = require('fs-extra');

fs.copySync('dist/plugins/plugin', 'local_modules/plugins/plugin');
