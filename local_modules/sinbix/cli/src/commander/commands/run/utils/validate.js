"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const chalk_1 = require("chalk");
function validate(workspace, opts) {
    const architect = workspace.projects.get(opts.project);
    if (!architect) {
        throw new Error(`Could not find project "${opts.project}"`);
    }
    const targets = architect.targets;
    const availableTargets = [...targets.keys()];
    const target = targets.get(opts.target);
    if (!target) {
        throw new Error(`Could not find target "${opts.target}" in the ${opts.project} project. Valid targets are: ${chalk_1.default.bold(availableTargets.join(', '))}`);
    }
    // Not all targets have configurations
    // and an undefined configuration is valid
    if (opts.configuration) {
        if (target.configurations) {
            const configuration = target.configurations[opts.configuration];
            if (!configuration) {
                throw new Error(`Could not find configuration "${opts.configuration}" in ${opts.project}:${opts.target}. Valid configurations are: ${Object.keys(target.configurations).join(', ')}`);
            }
        }
        else {
            throw new Error(`No configurations are defined for ${opts.project}:${opts.target}, so "${opts.configuration}" is invalid.`);
        }
    }
}
exports.validate = validate;
//# sourceMappingURL=validate.js.map