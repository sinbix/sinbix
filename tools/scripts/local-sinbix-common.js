const fs = require('fs-extra');

fs.copySync('dist/packages/plugins/common', 'local_modules/plugins/common');
