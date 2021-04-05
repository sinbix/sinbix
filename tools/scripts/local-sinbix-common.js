const fs = require('fs-extra');

fs.copySync('dist/plugins/common', 'local_modules/plugins/common');
