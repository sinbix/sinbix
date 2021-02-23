import { dirSync } from 'tmp';
import { writeFileSync } from "fs-extra";
import { join } from "path";
import { sinbixVersion } from "@sinbix/core/src/utils/versions";
import { spawnSync } from "child_process";

export function createSandbox(packageManager: string) {
  console.log(`Creating a sandbox with Sinbix...`);
  const tmpDir = dirSync().name;
  writeFileSync(
    join(tmpDir, 'package.json'),
    JSON.stringify({
      dependencies: {
        '@sinbix/common': sinbixVersion,
      },
      license: 'MIT',
    })
  );

  spawnSync(`${packageManager}`, ['install', '--silent'], {
    cwd: tmpDir,
    stdio: 'inherit',
  });

  return tmpDir;
}
