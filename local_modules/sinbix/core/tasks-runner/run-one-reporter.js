"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunOneReporter = void 0;
const output_1 = require("../utils/output");
class RunOneReporter {
    constructor(initiatingProject) {
        this.initiatingProject = initiatingProject;
    }
    beforeRun(projectNames, args) {
        this.projectNames = projectNames;
        const numberOfDeps = projectNames.length - 1;
        if (numberOfDeps > 0) {
            output_1.output.log({
                title: `${output_1.output.colors.gray('Running target')} ${args.target} ${output_1.output.colors.gray('for project')} ${this.initiatingProject} ${output_1.output.colors.gray(`and its ${numberOfDeps} deps.`)}`,
            });
            output_1.output.addVerticalSeparatorWithoutNewLines();
        }
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
            output_1.output.error({
                title: `Running target "${args.target}" failed`,
                bodyLines,
            });
        }
    }
}
exports.RunOneReporter = RunOneReporter;
//# sourceMappingURL=run-one-reporter.js.map