"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateKarmaConf = void 0;
const common_1 = require("../common");
const ast_utils_1 = require("../ast-utils");
/**
 * This returns a Rule which changes the default Angular CLI Generated karma.conf.js
 * @param options Object containing projectROot
 */
function updateKarmaConf(options) {
    return (host) => {
        const project = ast_utils_1.getProjectConfig(host, options.projectName);
        const projectRoot = project.root.replace(/\/$/, '');
        const karmaPath = project.architect.test.options.karmaConfig;
        ast_utils_1.createOrUpdate(host, karmaPath, `// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { join } = require('path');
const getBaseKarmaConfig = require('${common_1.offsetFromRoot(projectRoot)}karma.conf');

module.exports = function(config) {
  const baseConfig = getBaseKarmaConfig();
  config.set({
    ...baseConfig,
    coverageIstanbulReporter: {
      ...baseConfig.coverageIstanbulReporter,
      dir: join(__dirname, '${common_1.offsetFromRoot(projectRoot)}coverage/${projectRoot}')
    }
  });
};
`);
        return host;
    };
}
exports.updateKarmaConf = updateKarmaConf;
//# sourceMappingURL=update-karma-conf.js.map