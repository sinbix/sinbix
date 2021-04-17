import { createBuilder } from '@angular-devkit/architect';
import { CommandsBuilderSchema } from './schema';
import { exec, execSync } from 'child_process';
import yargsParser = require('yargs-parser');

export const LARGE_BUFFER = 1024 * 1000000;

interface NormalizedOptions extends CommandsBuilderSchema {
  commands: {
    command: string;
    forwardAllArgs?: boolean;
  }[];
  parsedArgs: { [k: string]: any };
}

const propKeys = [
  'command',
  'commands',
  'color',
  'parallel',
  'readyWhen',
  'cwd',
  'args',
  'envFile',
  'outputPath',
];

async function runInParallel(options: NormalizedOptions) {
  const proc = options.commands.map((c) =>
    createProcess(
      c.command,
      options.readyWhen,
      options.color,
      options.cwd
    ).then((result) => ({
      result,
      command: c.command,
    }))
  );

  if (options.readyWhen) {
    const r = await Promise.race(proc);
    if (!r.result) {
      process.stderr.write(
        `Warning: @sinbix/common:commands command "${r.command}" exited with non-zero status code`
      );
      return false;
    } else {
      return true;
    }
  } else {
    const r = await Promise.all(proc);
    const failed = r.filter((v) => !v.result);
    if (failed.length > 0) {
      failed.forEach((f) => {
        process.stderr.write(
          `Warning: @sinbix/common:commands command "${f.command}" exited with non-zero status code`
        );
      });
      return false;
    } else {
      return true;
    }
  }
}

function normalizeOptions(options: CommandsBuilderSchema): NormalizedOptions {
  options.parsedArgs = parseArgs(options);

  if (options.command) {
    options.commands = [{ command: options.command }];
    options.parallel = false;
  } else {
    options.commands = options.commands.map((c) =>
      typeof c === 'string' ? { command: c } : c
    );
  }
  (options as NormalizedOptions).commands.forEach((c) => {
    c.command = transformCommand(
      c.command,
      (options as NormalizedOptions).parsedArgs,
      c.forwardAllArgs ?? true
    );
  });
  return options as any;
}

async function runSerially(options: NormalizedOptions) {
  options.commands.forEach((c) => {
    createSyncProcess(c.command, options.color, options.cwd);
  });
  return true;
}

function createProcess(
  command: string,
  readyWhen: string,
  color: boolean,
  cwd: string
): Promise<boolean> {
  return new Promise((res) => {
    const childProcess = exec(command, {
      maxBuffer: LARGE_BUFFER,
      env: processEnv(color),
      cwd,
    });
    /**
     * Ensure the child process is killed when the parent exits
     */
    process.on('exit', () => childProcess.kill());
    childProcess.stdout.on('data', (data) => {
      process.stdout.write(data);
      if (readyWhen && data.toString().indexOf(readyWhen) > -1) {
        res(true);
      }
    });
    childProcess.stderr.on('data', (err) => {
      process.stderr.write(err);
      if (readyWhen && err.toString().indexOf(readyWhen) > -1) {
        res(true);
      }
    });
    childProcess.on('close', (code) => {
      if (!readyWhen) {
        res(code === 0);
      }
    });
  });
}

function createSyncProcess(command: string, color: boolean, cwd: string) {
  execSync(command, {
    env: processEnv(color),
    stdio: [0, 1, 2],
    maxBuffer: LARGE_BUFFER,
    cwd,
  });
}

function processEnv(color: boolean) {
  const env = { ...process.env };
  if (color) {
    env.FORCE_COLOR = `${color}`;
  }
  return env;
}

function transformCommand(
  command: string,
  args: { [key: string]: string },
  forwardAllArgs: boolean
) {
  if (command.indexOf('{args.') > -1) {
    const regex = /{args\.([^}]+)}/g;
    return command.replace(regex, (_, group: string) => args[group]);
  } else if (Object.keys(args).length > 0 && forwardAllArgs) {
    const stringifyArgs = Object.keys(args)
      .map((a) => `--${a}=${args[a]}`)
      .join(' ');
    return `${command} ${stringifyArgs}`;
  } else {
    return command;
  }
}

function parseArgs(options: CommandsBuilderSchema) {
  const args = options.args;
  if (!args) {
    return Object.keys(options)
      .filter((p) => propKeys.indexOf(p) === -1)
      .reduce((m, c) => ((m[c] = options[c]), m), {});
  }
  return args
    .split(' ')
    .map((t) => t.trim())
    .reduce((m, c) => {
      if (!c.startsWith('--')) {
        throw new Error(`Invalid args: ${args}`);
      }
      const [key, value] = c.substring(2).split('=');
      if (!key || !value) {
        throw new Error(`Invalid args: ${args}`);
      }
      m[key] = value;
      return m;
    }, {});
}

async function loadEnvVars(path?: string) {
  if (path) {
    const result = (await import('dotenv')).config({ path });
    if (result.error) {
      throw result.error;
    }
  } else {
    try {
      (await import('dotenv')).config();
    } catch (e) {}
  }
}

export async function runBuilder(
  options: CommandsBuilderSchema
): Promise<unknown> {
  // Special handling of extra options coming through Angular CLI
  if (options['--']) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _, ...overrides } = yargsParser(options['--'] as string[], {
      configuration: { 'camel-case-expansion': false },
    });
    options = { ...options, ...overrides };
    delete options['--'];
  }

  await loadEnvVars(options.envFile);
  const normalized = normalizeOptions(options);

  if (options.readyWhen && !options.parallel) {
    throw new Error(
      'ERROR: Bad builder config for @sinbix/common:commands - "readyWhen" can only be used when parallel=true'
    );
  }

  try {
    const success = options.parallel
      ? await runInParallel(normalized)
      : await runSerially(normalized);
    return { success };
  } catch (e) {
    throw new Error(
      `ERROR: Something went wrong in @sinbix/commands - ${e.message}`
    );
  }
}

//@ts-ignore
export default createBuilder(runBuilder);
