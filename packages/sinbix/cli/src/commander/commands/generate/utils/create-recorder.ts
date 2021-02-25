import { logging, tags, terminal } from "@angular-devkit/core";
import { DryRunEvent } from "@angular-devkit/schematics";

export function createRecorder(
  record: {
    loggingQueue: string[];
    error: boolean;
  },
  logger: logging.Logger
) {
  return (event: DryRunEvent) => {
    const eventPath = event.path.startsWith('/')
      ? event.path.substr(1)
      : event.path;
    if (event.kind === 'error') {
      record.error = true;
      logger.warn(
        `ERROR! ${eventPath} ${
          event.description == 'alreadyExist'
            ? 'already exists'
            : 'does not exist.'
        }.`
      );
    } else if (event.kind === 'update') {
      record.loggingQueue.push(
        tags.oneLine`${terminal.white('UPDATE')} ${eventPath} (${
          event.content.length
        } bytes)`
      );
    } else if (event.kind === 'create') {
      record.loggingQueue.push(
        tags.oneLine`${terminal.green('CREATE')} ${eventPath} (${
          event.content.length
        } bytes)`
      );
    } else if (event.kind === 'delete') {
      record.loggingQueue.push(`${terminal.yellow('DELETE')} ${eventPath}`);
    } else if (event.kind === 'rename') {
      record.loggingQueue.push(
        `${terminal.blue('RENAME')} ${eventPath} => ${event.to}`
      );
    }
  };
}
