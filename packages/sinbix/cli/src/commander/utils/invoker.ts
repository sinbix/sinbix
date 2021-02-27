import { LoggerFlags } from "@sinbix/cli/src";

export async function invokeCli(root: string, args: string[]) {
  const [command, ...commandArgs] = args;
  process.exit(await invokeCommand(command, root, commandArgs));
}

export async function invokeCommand(
  command: string,
  root: string,
  commandArgs: string[] = []
) {
  if (command === undefined) {
    command = 'help';
  }

  function getFlag(...flags: string[]) {
    for (const flag of flags) {
      const flagIndex = commandArgs.indexOf(flag);

      if (flagIndex >= 0) {
        commandArgs.splice(flagIndex, 1);

        return true;
      }
    }
    return false;
  }

  const flags: LoggerFlags = {
    verbose: getFlag('--verbose', '-v'),
    silent: getFlag('--silent')
  }

  switch (command) {
    case 'new':
      return (await import('../commands/new')).newCommand(
        root,
        commandArgs,
        flags
      );
    case 'generate':
    case 'g':
      return (await import('../commands/generate')).generateCommand(
        root,
        commandArgs,
        flags
      );
    case 'run':
    case 'r':
      return (await import('../commands/run')).runCommand(
        root,
        commandArgs,
        flags.verbose
      );
    case 'migrate':
      return (await import('../commands/migrate')).migrate(
        root,
        commandArgs,
        flags.verbose
      );
    case 'help':
    case '--help':
      return (await import('../commands/help')).help();
    default: {
      const projectNameIncluded =
        commandArgs[0] && !commandArgs[0].startsWith('-');
      const projectName = projectNameIncluded ? commandArgs[0] : '';
      // this is to make `tao test mylib` same as `tao run mylib:test`
      return (await import('../commands/run')).runCommand(
        root,
        [
          `${projectName}:${command}`,
          ...(projectNameIncluded ? commandArgs.slice(1) : commandArgs),
        ],
        flags.verbose
      );
    }
  }
}
