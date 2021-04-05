import { invokeCli } from '../src/commander';

const argv = require('yargs-parser')(process.argv.slice(2));

(async () => {
  await invokeCli(argv.sinbixWorkspaceRoot || process.cwd(), process.argv.slice(2));
})();
