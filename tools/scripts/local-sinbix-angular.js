const fs = require('fs-extra');

fs.copySync('dist/packages/plugins/angular', 'local_modules/plugins/angular');
