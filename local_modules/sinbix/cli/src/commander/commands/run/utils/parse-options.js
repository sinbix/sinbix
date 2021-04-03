"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRunOpts = void 0;
const chalk_1 = require("chalk");
const minimist = require("minimist");
const utils_1 = require("../../../utils");
function parseRunOpts(args, defaultProjectName, logger) {
    const runOptions = utils_1.convertToCamelCase(minimist(args, {
        boolean: ['help', 'prod'],
        string: ['configuration', 'project'],
    }));
    const help = runOptions.help;
    if (!runOptions._ || !runOptions._[0]) {
        throwInvalidInvocation();
    }
    let [project, target, configuration] = runOptions._[0].split(':');
    if (!project && defaultProjectName) {
        logger.debug(`No project name specified. Using default project : ${chalk_1.default.bold(defaultProjectName)}`);
        project = defaultProjectName;
    }
    if (runOptions.configuration) {
        configuration = runOptions.configuration;
    }
    if (runOptions.prod) {
        configuration = 'production';
    }
    if (runOptions.project) {
        project = runOptions.project;
    }
    if (!project || !target) {
        throwInvalidInvocation();
    }
    const res = { project, target, configuration, help, runOptions };
    delete runOptions['help'];
    delete runOptions['_'];
    delete runOptions['configuration'];
    delete runOptions['prod'];
    delete runOptions['project'];
    return res;
}
exports.parseRunOpts = parseRunOpts;
function throwInvalidInvocation() {
    throw new Error(`Specify the project name and the target (e.g., ${utils_1.commandName} run proj:build)`);
}
//# sourceMappingURL=parse-options.js.map