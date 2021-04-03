"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkflow = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular-devkit/core");
const tools_1 = require("@angular-devkit/schematics/tools");
const detect_package_manager_1 = require("@sinbix/core/src/utils/detect-package-manager");
const schematics_1 = require("@angular-devkit/schematics");
const inquirer = require("inquirer");
function createWorkflow(fsHost, root, opts) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const workflow = new tools_1.NodeWorkflow(fsHost, {
            force: opts.force,
            dryRun: opts.dryRun,
            packageManager: detect_package_manager_1.detectPackageManager(),
            root: core_1.normalize(root),
            registry: new core_1.schema.CoreSchemaRegistry(schematics_1.formats.standardFormats),
            resolvePaths: [process.cwd(), root],
        });
        const _params = opts.schematicOptions._;
        delete opts.schematicOptions._;
        workflow.registry.addSmartDefaultProvider('argv', (schema) => {
            if ('index' in schema) {
                return _params[Number(schema['index'])];
            }
            else {
                return _params;
            }
        });
        if (opts.defaults) {
            workflow.registry.addPreTransform(core_1.schema.transforms.addUndefinedDefaults);
        }
        else {
            workflow.registry.addPostTransform(core_1.schema.transforms.addUndefinedDefaults);
        }
        workflow.engineHost.registerOptionsTransform(tools_1.validateOptionsWithSchema(workflow.registry));
        if (opts.interactive !== false && isTTY()) {
            workflow.registry.usePromptProvider((definitions) => {
                const questions = definitions.map((definition) => {
                    const question = {
                        name: definition.id,
                        message: definition.message,
                        default: definition.default,
                    };
                    const validator = definition.validator;
                    if (validator) {
                        question.validate = (input) => validator(input);
                    }
                    switch (definition.type) {
                        case 'confirmation':
                            question.type = 'confirm';
                            break;
                        case 'list':
                            question.type = definition.multiselect ? 'checkbox' : 'list';
                            question.choices =
                                definition.items &&
                                    definition.items.map((item) => {
                                        if (typeof item == 'string') {
                                            return item;
                                        }
                                        else {
                                            return {
                                                name: item.label,
                                                value: item.value,
                                            };
                                        }
                                    });
                            break;
                        default:
                            question.type = definition.type;
                            break;
                    }
                    return question;
                });
                return inquirer.prompt(questions);
            });
        }
        return workflow;
    });
}
exports.createWorkflow = createWorkflow;
function isTTY() {
    return !!process.stdout.isTTY && process.env['CI'] !== 'true';
}
//# sourceMappingURL=create-workflow.js.map