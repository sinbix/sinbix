"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPromptProvider = void 0;
const inquirer = require("inquirer");
function createPromptProvider() {
    return (definitions) => {
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
                    return Object.assign(Object.assign({}, question), { type: 'confirm' });
                case 'list':
                    return Object.assign(Object.assign({}, question), { type: !!definition.multiselect ? 'checkbox' : 'list', choices: definition.items &&
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
                            }) });
                default:
                    return Object.assign(Object.assign({}, question), { type: definition.type });
            }
        });
        return inquirer.prompt(questions);
    };
}
exports.createPromptProvider = createPromptProvider;
//# sourceMappingURL=create-prompt-provider.js.map