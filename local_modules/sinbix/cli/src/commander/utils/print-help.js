"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCommandNameAndDescription = exports.toolDescription = exports.commandName = exports.printHelp = void 0;
const core_1 = require("@angular-devkit/core");
const chalk_1 = require("chalk");
function formatOption(name, description) {
    return `  --${(name + '                     ').substr(0, 22)}${chalk_1.default.grey(description)}`;
}
function printHelp(header, schema, logger) {
    const allPositional = Object.keys(schema.properties).filter((key) => {
        const p = schema.properties[key];
        return p['$default'] && p['$default']['$source'] === 'argv';
    });
    const positional = allPositional.length > 0 ? ` [${allPositional[0]}]` : '';
    const args = Object.keys(schema.properties)
        .map((name) => {
        const d = schema.properties[name];
        const def = d.default ? ` (default: ${d.default})` : '';
        return formatOption(name, `${d.description}${def}`);
    })
        .join('\n');
    logger.info(core_1.tags.stripIndent `
${chalk_1.default.bold(header + positional + ' [options,...]')}

${chalk_1.default.bold('Options')}:
${args}
${formatOption('help', 'Show available options for project target.')}
  `);
}
exports.printHelp = printHelp;
exports.commandName = 'sinbix';
exports.toolDescription = 'Sinbix - Extensible Dev Tools for Monorepos.';
function setCommandNameAndDescription(name, description) {
    exports.commandName = name;
    exports.toolDescription = description;
}
exports.setCommandNameAndDescription = setCommandNameAndDescription;
//# sourceMappingURL=print-help.js.map