import { tags } from '@angular-devkit/core';
import chalk from 'chalk';
import {} from '../utils';
import { getLogger, commandName, toolDescription } from '../utils';

export function help() {
  const logger = getLogger({ verbose: true });

  logger.info(tags.stripIndent`
    ${chalk.bold(toolDescription)}

    ${chalk.bold('Create a new project.')}
    ${commandName} new ${chalk.grey(
    '[project-name] [--collection=schematic-collection] [options, ...]'
  )}

    ${chalk.bold('Generate code.')}
    ${commandName} generate ${chalk.grey(
    '[schematic-collection:][schematic] [options, ...]'
  )}
    ${commandName} g ${chalk.grey(
    '[schematic-collection:][schematic] [options, ...]'
  )}

    ${chalk.bold('Run target.')}
    ${commandName} run ${chalk.grey(
    '[project][:target][:configuration] [options, ...]'
  )}
    ${commandName} r ${chalk.grey(
    '[project][:target][:configuration] [options, ...]'
  )}

    You can also use the infix notation to run a target:
    ${commandName} [target] [project] [options, ...]

    ${chalk.bold('Migrate packages and create migrations.json.')}
    ${commandName} migrate ${chalk.grey('[package-name]')}

    ${chalk.bold('Run migrations.')}
    ${commandName} migrate ${chalk.grey('--run-migrations=[filename]')}

  `);
  return 0;
}
