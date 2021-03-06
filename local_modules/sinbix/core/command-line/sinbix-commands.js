#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandsObject = void 0;
const child_process_1 = require("child_process");
const detect_package_manager_1 = require("../utils/detect-package-manager");
const yargs = require("yargs");
const versions_1 = require("../utils/versions");
const dep_graph_1 = require("./dep-graph");
const format_1 = require("./format");
const lint_1 = require("./lint");
const list_1 = require("./list");
const report_1 = require("./report");
const workspace_schematic_1 = require("./workspace-schematic");
const affected_1 = require("./affected");
const run_many_1 = require("./run-many");
const noop = (yargs) => yargs;
/**
 * Exposing the Yargs commands object so the documentation generator can
 * parse it. The CLI will consume it and call the `.argv` to bootstrapped
 * the CLI. These command declarations needs to be in a different file
 * from the `.argv` call, so the object and it's relative scripts can
 * be executed correctly.
 */
exports.commandsObject = yargs
    .usage('Extensible Dev Tools for Monorepos')
    .command('run [project][:target][:configuration] [options, ...]', `
    Run a target for a project
    (e.g., sinbix run myapp:serve:production).

    You can also use the infix notation to run a target:
    (e.g., sinbix serve myapp --configuration=production)
    `)
    .command('generate [schematic-collection:][schematic] [options, ...]', `
    Generate code
    (e.g., sinbix generate @sinbix/web:app myapp).
    `)
    .command('affected', 'Run task for affected projects', (yargs) => withAffectedOptions(withParallel(withTarget(yargs))), (args) => affected_1.affected('affected', Object.assign({}, args)))
    .command('run-many', 'Run task for multiple projects', (yargs) => withRunManyOptions(withParallel(withTarget(yargs))), (args) => run_many_1.runMany(Object.assign({}, args)))
    .command('affected:apps', 'Print applications affected by changes', (yargs) => withAffectedOptions(withPlainOption(yargs)), (args) => affected_1.affected('apps', Object.assign({}, args)))
    .command('affected:libs', 'Print libraries affected by changes', (yargs) => withAffectedOptions(withPlainOption(yargs)), (args) => affected_1.affected('libs', Object.assign({}, args)))
    .command('affected:build', 'Build applications and publishable libraries affected by changes', (yargs) => withAffectedOptions(withParallel(yargs)), (args) => affected_1.affected('affected', Object.assign(Object.assign({}, args), { target: 'build' })))
    .command('affected:test', 'Test projects affected by changes', (yargs) => withAffectedOptions(withParallel(yargs)), (args) => affected_1.affected('affected', Object.assign(Object.assign({}, args), { target: 'test' })))
    .command('affected:e2e', 'Run e2e tests for the applications affected by changes', (yargs) => withAffectedOptions(withParallel(yargs)), (args) => affected_1.affected('affected', Object.assign(Object.assign({}, args), { target: 'e2e' })))
    .command('affected:dep-graph', 'Graph dependencies affected by changes', (yargs) => withAffectedOptions(withDepGraphOptions(yargs)), (args) => affected_1.affected('dep-graph', Object.assign({}, args)))
    .command('print-affected', 'Graph execution plan', (yargs) => withAffectedOptions(withPrintAffectedOptions(yargs)), (args) => affected_1.affected('print-affected', Object.assign({}, args)))
    .command('affected:lint', 'Lint projects affected by changes', (yargs) => withAffectedOptions(withParallel(yargs)), (args) => affected_1.affected('affected', Object.assign(Object.assign({}, args), { target: 'lint' })))
    .command('dep-graph', 'Graph dependencies within workspace', (yargs) => withDepGraphOptions(yargs), (args) => dep_graph_1.generateGraph(args, []))
    .command('format:check', 'Check for un-formatted files', withFormatOptions, (args) => format_1.format('check', args))
    .command(['format:write', 'format'], 'Overwrite un-formatted files', withFormatOptions, (args) => format_1.format('write', args))
    .command('workspace-lint [files..]', 'Lint workspace or list of files.  Note: To exclude files from this lint rule, you can add them to the ".sinbixignore" file', noop, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(_) => lint_1.workspaceLint())
    .command('workspace-schematic [name]', 'Runs a workspace schematic from the tools/schematics directory', (yargs) => {
    yargs.option('list-schematics', {
        describe: 'List the available workspace-schematics',
        type: 'boolean',
    });
    /**
     * Don't require `name` if only listing available
     * schematics
     */
    if (yargs.argv.listSchematics !== true) {
        yargs.demandOption(['name']).positional('name', {
            type: 'string',
            describe: 'The name of your schematic`',
        });
    }
    return yargs;
}, () => workspace_schematic_1.workspaceSchematic(process.argv.slice(3)))
    .command('migrate', `Creates a migrations file or runs migrations from the migrations file.
- Migrate packages and create migrations.json (e.g., sinbix migrate @sinbix/core@latest)
- Run migrations (e.g., sinbix migrate --run-migrations=migrations.json)
    `, (yargs) => yargs, () => {
    const executable = `${detect_package_manager_1.getPackageManagerExecuteCommand()} tao`;
    child_process_1.execSync(`${executable} migrate ${process.argv.slice(3).join(' ')}`, {
        stdio: ['inherit', 'inherit', 'inherit'],
    });
})
    .command(report_1.report)
    .command(list_1.list)
    .help('help')
    .version(versions_1.sinbixVersion)
    .option('quiet', { type: 'boolean', hidden: true });
function withFormatOptions(yargs) {
    return withAffectedOptions(yargs)
        .option('libs-and-apps', {
        type: 'boolean',
    })
        .option('projects', {
        describe: 'Projects to format (comma delimited)',
        type: 'array',
        coerce: parseCSV,
    })
        .conflicts({
        all: 'projects',
    });
}
function withPrintAffectedOptions(yargs) {
    return yargs.option('select', { type: 'string' });
}
function withPlainOption(yargs) {
    return yargs.option('plain', {
        describe: 'Produces a plain output for affected:apps and affected:libs',
    });
}
function withAffectedOptions(yargs) {
    return yargs
        .option('files', {
        describe: 'Change the way Sinbix is calculating the affected command by providing directly changed files, list of files delimited by commas',
        type: 'array',
        requiresArg: true,
        coerce: parseCSV,
    })
        .option('uncommitted', {
        describe: 'Uncommitted changes',
        type: 'boolean',
        default: undefined,
    })
        .option('untracked', {
        describe: 'Untracked changes',
        type: 'boolean',
        default: undefined,
    })
        .option('all', {
        describe: 'All projects',
        type: 'boolean',
        default: undefined,
    })
        .option('base', {
        describe: 'Base of the current branch (usually master)',
        type: 'string',
        requiresArg: true,
    })
        .option('head', {
        describe: 'Latest commit of the current branch (usually HEAD)',
        type: 'string',
        requiresArg: true,
    })
        .group(['base'], 'Run command using --base=[SHA1] (affected by the committed, uncommitted and untracked changes):')
        .group(['base', 'head'], 'or using --base=[SHA1] --head=[SHA2] (affected by the committed changes):')
        .group(['files', 'uncommitted', 'untracked'], 'or using:')
        .implies('head', 'base')
        .option('exclude', {
        describe: 'Exclude certain projects from being processed',
        type: 'array',
        coerce: parseCSV,
        default: [],
    })
        .options('runner', {
        describe: 'This is the name of the tasks runner configured in sinbix.json',
        type: 'string',
    })
        .options('skip-sinbix-cache', {
        describe: 'Rerun the tasks even when the results are available in the cache',
        type: 'boolean',
        default: false,
    })
        .options('configuration', {
        describe: 'This is the configuration to use when performing tasks on projects',
        type: 'string',
    })
        .options('only-failed', {
        describe: 'Isolate projects which previously failed',
        type: 'boolean',
        default: false,
    })
        .option('verbose', {
        describe: 'Print additional error stack trace on failure',
    })
        .conflicts({
        files: ['uncommitted', 'untracked', 'base', 'head', 'all'],
        untracked: ['uncommitted', 'files', 'base', 'head', 'all'],
        uncommitted: ['files', 'untracked', 'base', 'head', 'all'],
        all: ['files', 'untracked', 'uncommitted', 'base', 'head'],
    });
}
function withRunManyOptions(yargs) {
    return yargs
        .option('projects', {
        describe: 'Projects to run (comma delimited)',
        type: 'string',
    })
        .option('all', {
        describe: 'Run the target on all projects in the workspace',
        type: 'boolean',
        default: undefined,
    })
        .check(({ all, projects }) => {
        if ((all && projects) || (!all && !projects))
            throw new Error('You must provide either --all or --projects');
        return true;
    })
        .options('runner', {
        describe: 'Override the tasks runner in `sinbix.json`',
        type: 'string',
    })
        .options('skip-sinbix-cache', {
        describe: 'Rerun the tasks even when the results are available in the cache',
        type: 'boolean',
        default: false,
    })
        .options('configuration', {
        describe: 'This is the configuration to use when performing tasks on projects',
        type: 'string',
    })
        .options('with-deps', {
        describe: 'Include dependencies of specified projects when computing what to run',
        type: 'boolean',
        default: false,
    })
        .options('only-failed', {
        describe: 'Only run the target on projects which previously failed',
        type: 'boolean',
        default: false,
    })
        .option('verbose', {
        describe: 'Print additional error stack trace on failure',
    })
        .conflicts({
        all: 'projects',
    });
}
function withDepGraphOptions(yargs) {
    return yargs
        .option('file', {
        describe: 'output file (e.g. --file=output.json or --file=dep-graph.html)',
        type: 'string',
    })
        .option('focus', {
        describe: 'Use to show the dependency graph for a particular project and every node that is either an ancestor or a descendant.',
        type: 'string',
    })
        .option('exclude', {
        describe: 'List of projects delimited by commas to exclude from the dependency graph.',
        type: 'array',
        coerce: parseCSV,
    })
        .option('groupByFolder', {
        describe: 'Group projects by folder in dependency graph',
        type: 'boolean',
    })
        .option('host', {
        describe: 'Bind the dep graph server to a specific ip address.',
        type: 'string',
    })
        .option('port', {
        describe: 'Bind the dep graph server to a specific port.',
        type: 'number',
    });
}
function parseCSV(args) {
    return args
        .map((arg) => arg.split(','))
        .reduce((acc, value) => {
        return [...acc, ...value];
    }, []);
}
function withParallel(yargs) {
    return yargs
        .option('parallel', {
        describe: 'Parallelize the command',
        type: 'boolean',
        default: false,
    })
        .option('maxParallel', {
        describe: 'Max number of parallel processes. This flag is ignored if the parallel option is set to `false`.',
        type: 'number',
        default: 3,
    });
}
function withTarget(yargs) {
    return yargs.option('target', {
        describe: 'Task to run for affected projects',
        type: 'string',
        requiresArg: true,
        demandOption: true,
        global: false,
    });
}
//# sourceMappingURL=sinbix-commands.js.map