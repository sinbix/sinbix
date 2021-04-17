"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSandbox = void 0;
const tmp_1 = require("tmp");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const versions_1 = require("@sinbix/core/utils/versions");
const child_process_1 = require("child_process");
function createSandbox(packageManager) {
    console.log(`Creating a sandbox with Sinbix...`);
    const tmpDir = tmp_1.dirSync().name;
    fs_extra_1.writeFileSync(path_1.join(tmpDir, 'package.json'), JSON.stringify({
        dependencies: {
            '@sinbix/common': versions_1.sinbixVersion,
        },
        license: 'MIT',
    }));
    child_process_1.spawnSync(`${packageManager}`, ['install', '--silent'], {
        cwd: tmpDir,
        stdio: 'inherit',
    });
    return tmpDir;
}
exports.createSandbox = createSandbox;
//# sourceMappingURL=create-sandbox.js.map