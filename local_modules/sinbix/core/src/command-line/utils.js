"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAffectedConfig = exports.splitArgsIntoSinbixArgsAndOverrides = void 0;
const yargsParser = require("yargs-parser");
const fileUtils = require("../file-utils");
const output_1 = require("../utils/output");
const runOne = [
    'target',
    'configuration',
    'prod',
    'runner',
    'parallel',
    'maxParallel',
    'max-parallel',
    'exclude',
    'onlyFailed',
    'only-failed',
    'verbose',
    'help',
    'version',
    'withDeps',
    'with-deps',
    'skipSinbixCache',
    'skip-sinbix-cache',
    'scan',
];
const runMany = [...runOne, 'projects', 'quiet', 'all'];
const runAffected = [
    ...runOne,
    'untracked',
    'uncommitted',
    'all',
    'base',
    'head',
    'files',
    'quiet',
    'plain',
    'select',
];
const ignoreArgs = ['$0', '_'];
function splitArgsIntoSinbixArgsAndOverrides(args, mode, options = { printWarnings: true }) {
    const sinbixSpecific = mode === 'run-one' ? runOne : mode === 'run-many' ? runMany : runAffected;
    const sinbixArgs = {};
    const overrides = yargsParser(args._);
    delete overrides._;
    Object.entries(args).forEach(([key, value]) => {
        if (sinbixSpecific.includes(key)) {
            sinbixArgs[key] = value;
        }
        else if (!ignoreArgs.includes(key)) {
            overrides[key] = value;
        }
    });
    if (mode === 'run-many') {
        if (!sinbixArgs.projects) {
            sinbixArgs.projects = [];
        }
        else {
            sinbixArgs.projects = args.projects
                .split(',')
                .map((p) => p.trim());
        }
    }
    if (sinbixArgs.prod) {
        delete sinbixArgs.prod;
        sinbixArgs.configuration = 'production';
    }
    if (mode === 'affected') {
        if (options.printWarnings) {
            printArgsWarning(sinbixArgs);
        }
        if (!sinbixArgs.files &&
            !sinbixArgs.uncommitted &&
            !sinbixArgs.untracked &&
            !sinbixArgs.base &&
            !sinbixArgs.head &&
            !sinbixArgs.all &&
            args._.length >= 2) {
            sinbixArgs.base = args._[0];
            sinbixArgs.head = args._[1];
        }
        else if (!sinbixArgs.base) {
            const affectedConfig = getAffectedConfig();
            sinbixArgs.base = affectedConfig.defaultBase;
        }
    }
    if (!sinbixArgs.skipSinbixCache) {
        sinbixArgs.skipSinbixCache = false;
    }
    return { sinbixArgs: sinbixArgs, overrides };
}
exports.splitArgsIntoSinbixArgsAndOverrides = splitArgsIntoSinbixArgsAndOverrides;
function getAffectedConfig() {
    const config = fileUtils.readSinbixJson();
    const defaultBase = 'master';
    if (config.affected) {
        return {
            defaultBase: config.affected.defaultBase || defaultBase,
        };
    }
    else {
        return {
            defaultBase,
        };
    }
}
exports.getAffectedConfig = getAffectedConfig;
function printArgsWarning(options) {
    const { files, uncommitted, untracked, base, head, all } = options;
    const affectedConfig = getAffectedConfig();
    if (!files && !uncommitted && !untracked && !base && !head && !all) {
        output_1.output.note({
            title: `Affected criteria defaulted to --base=${output_1.output.bold(`${affectedConfig.defaultBase}`)} --head=${output_1.output.bold('HEAD')}`,
        });
    }
    if (all) {
        output_1.output.warn({
            title: `Running affected:* commands with --all can result in very slow builds.`,
            bodyLines: [
                output_1.output.bold('--all') +
                    ' is not meant to be used for any sizable project or to be used in CI.',
                '',
                output_1.output.colors.gray('Learn more about checking only what is affected: ') + 'https://sinbix.dev/guides/monorepo-affected.',
            ],
        });
    }
}
//# sourceMappingURL=utils.js.map