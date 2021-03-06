"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultReporter = void 0;
const output_1 = require("../utils/output");
class DefaultReporter {
    beforeRun(projectNames, args, taskOverrides) {
        this.projectNames = projectNames;
        if (projectNames.length <= 0) {
            let description = `with "${args.target}"`;
            if (args.configuration) {
                description += ` that are configured for "${args.configuration}"`;
            }
            output_1.output.logSingleLine(`No projects ${description} were run`);
            return;
        }
        const bodyLines = projectNames.map((affectedProject) => `${output_1.output.colors.gray('-')} ${affectedProject}`);
        if (Object.keys(taskOverrides).length > 0) {
            bodyLines.push('');
            bodyLines.push(`${output_1.output.colors.gray('With flags:')}`);
            Object.entries(taskOverrides)
                .map(([flag, value]) => `  --${flag}=${value}`)
                .forEach((arg) => bodyLines.push(arg));
        }
        output_1.output.log({
            title: `${output_1.output.colors.gray('Running target')} ${args.target} ${output_1.output.colors.gray('for projects:')}`,
            bodyLines,
        });
        output_1.output.addVerticalSeparatorWithoutNewLines();
    }
    printResults(args, failedProjectNames, startedWithFailedProjects, cachedProjectNames) {
        output_1.output.addNewline();
        output_1.output.addVerticalSeparatorWithoutNewLines();
        if (failedProjectNames.length === 0) {
            const bodyLines = cachedProjectNames.length > 0
                ? [
                    output_1.output.colors.gray(`Sinbix read the output from cache instead of running the command for ${cachedProjectNames.length} out of ${this.projectNames.length} projects.`),
                ]
                : [];
            output_1.output.success({
                title: `Running target "${args.target}" succeeded`,
                bodyLines,
            });
            if (args.onlyFailed && startedWithFailedProjects) {
                output_1.output.warn({
                    title: `Only projects ${output_1.output.underline('which had previously failed')} were run`,
                    bodyLines: [
                        `You should verify by running ${output_1.output.underline('without')} ${output_1.output.bold('--only-failed')}`,
                    ],
                });
            }
        }
        else {
            const bodyLines = [
                output_1.output.colors.gray('Failed projects:'),
                '',
                ...failedProjectNames.map((project) => `${output_1.output.colors.gray('-')} ${project}`),
            ];
            if (!args.onlyFailed && !startedWithFailedProjects) {
                bodyLines.push('');
                bodyLines.push(`${output_1.output.colors.gray('You can isolate the above projects by passing:')} ${output_1.output.bold('--only-failed')}`);
            }
            output_1.output.error({
                title: `Running target "${args.target}" failed`,
                bodyLines,
            });
        }
    }
}
exports.DefaultReporter = DefaultReporter;
//# sourceMappingURL=default-reporter.js.map