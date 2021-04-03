"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.report = exports.packagesWeCareAbout = void 0;
const chalk_1 = require("chalk");
const fs_1 = require("fs");
const app_root_1 = require("../utils/app-root");
const output_1 = require("../utils/output");
exports.packagesWeCareAbout = [];
exports.report = {
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
    exports.packagesWeCareAbout.forEach((p) => {
        let status = 'Not Found';
        try {
            const packageJsonPath = require.resolve(`${p}/package.json`, {
                paths: [app_root_1.appRootPath],
            });
            const packageJson = JSON.parse(fs_1.readFileSync(packageJsonPath).toString());
            status = packageJson.version;
        }
        catch (_a) { }
        bodyLines.push(`${chalk_1.default.green(p)} : ${chalk_1.default.bold(status)}`);
    });
    output_1.output.log({
        title: 'Report complete - copy this into the issue template',
        bodyLines,
    });
}
//# sourceMappingURL=report.js.map