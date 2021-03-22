import chalk from 'chalk';
import { readFileSync } from 'fs';
import { appRootPath } from '../utils/app-root';
import { output } from '../utils/output';

export const packagesWeCareAbout = [];

export const report = {
  command: 'report',
  describe: 'Reports useful version numbers to copy into the Sinbix issue template',
  builder: (yargs) => yargs,
  handler: reportHandler,
};

/**
 * Reports relevant version numbers for adding to an Sinbix issue report
 *
 * @remarks
 *
 * Must be run within an Sinbix workspace
 *
 */
function reportHandler() {
  const bodyLines = [];

  packagesWeCareAbout.forEach((p) => {
    let status = 'Not Found';
    try {
      const packageJsonPath = require.resolve(`${p}/package.json`, {
        paths: [appRootPath],
      });
      const packageJson = JSON.parse(readFileSync(packageJsonPath).toString());
      status = packageJson.version;
    } catch {}
    bodyLines.push(`${chalk.green(p)} : ${chalk.bold(status)}`);
  });

  output.log({
    title: 'Report complete - copy this into the issue template',
    bodyLines,
  });
}
