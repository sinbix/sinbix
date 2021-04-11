const fs = require('fs-extra');
const child_process = require('child_process');

function local(path) {
  const distPath = `dist/${path}`;
  const localPath = `local_modules/${path}`;

  fs.removeSync(localPath);

  fs.copySync(distPath, localPath);

  child_process.execSync(`npm i --prefix=${localPath} --no-package-lock`);
}

module.exports = { local };
