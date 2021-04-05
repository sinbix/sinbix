import { logging, tags } from '@angular-devkit/core';
import chalk from 'chalk';
import { Schema } from './params';

function formatOption(name: string, description: string) {
  return `  --${(name + '                     ').substr(0, 22)}${chalk.grey(
    description
  )}`;
}

export function printHelp(
  header: string,
  schema: Schema,
  logger: logging.Logger
) {
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

  logger.info(tags.stripIndent`
${chalk.bold(header + positional + ' [options,...]')}

${chalk.bold('Options')}:
${args}
${formatOption('help', 'Show available options for project target.')}
  `);
}

export let commandName = 'sinbix';
export let toolDescription = 'Sinbix - Extensible Dev Tools for Monorepos.';

export function setCommandNameAndDescription(
  name: string,
  description: string
) {
  commandName = name;
  toolDescription = description;
}
