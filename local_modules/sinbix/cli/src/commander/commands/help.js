"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = void 0;
const core_1 = require("@angular-devkit/core");
const chalk_1 = require("chalk");
const utils_1 = require("../utils");
function help() {
    const logger = utils_1.getLogger({ verbose: true });
    logger.info(core_1.tags.stripIndent `
    ${chalk_1.default.bold(utils_1.toolDescription)}

    ${chalk_1.default.bold('Create a new project.')}
    ${utils_1.commandName} new ${chalk_1.default.grey('[project-name] [--collection=schematic-collection] [options, ...]')}

    ${chalk_1.default.bold('Generate code.')}
    ${utils_1.commandName} generate ${chalk_1.default.grey('[schematic-collection:][schematic] [options, ...]')}
    ${utils_1.commandName} g ${chalk_1.default.grey('[schematic-collection:][schematic] [options, ...]')}

    ${chalk_1.default.bold('Run target.')}
    ${utils_1.commandName} run ${chalk_1.default.grey('[project][:target][:configuration] [options, ...]')}
    ${utils_1.commandName} r ${chalk_1.default.grey('[project][:target][:configuration] [options, ...]')}

    You can also use the infix notation to run a target:
    ${utils_1.commandName} [target] [project] [options, ...]

    ${chalk_1.default.bold('Migrate packages and create migrations.json.')}
    ${utils_1.commandName} migrate ${chalk_1.default.grey('[package-name]')}

    ${chalk_1.default.bold('Run migrations.')}
    ${utils_1.commandName} migrate ${chalk_1.default.grey('--run-migrations=[filename]')}

  `);
    return 0;
}
exports.help = help;
//# sourceMappingURL=help.js.map