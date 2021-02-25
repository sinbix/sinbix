import { JsonObject, normalize, schema, virtualFs } from "@angular-devkit/core";
import * as fs from "fs";
import { NodeWorkflow, validateOptionsWithSchema } from "@angular-devkit/schematics/tools";
import { formats } from "@angular-devkit/schematics";
import * as inquirer from 'inquirer';

import { GenerateOptions } from "./models";
import { detectPackageManager } from "../../../utils";

export async function createWorkflow(
  fsHost: virtualFs.Host<fs.Stats>,
  root: string,
  opts: GenerateOptions
) {
  const workflow = new NodeWorkflow(fsHost, {
    force: opts.force,
    dryRun: opts.dryRun,
    packageManager: detectPackageManager(),
    root: normalize(root),
    registry: new schema.CoreSchemaRegistry(formats.standardFormats),
    resolvePaths: [process.cwd(), root],
  });
  const _params = opts.schematicOptions._;
  delete opts.schematicOptions._;
  workflow.registry.addSmartDefaultProvider('argv', (schema: JsonObject) => {
    if ('index' in schema) {
      return _params[Number(schema['index'])];
    } else {
      return _params;
    }
  });

  if (opts.defaults) {
    workflow.registry.addPreTransform(schema.transforms.addUndefinedDefaults);
  } else {
    workflow.registry.addPostTransform(schema.transforms.addUndefinedDefaults);
  }

  workflow.engineHost.registerOptionsTransform(
    validateOptionsWithSchema(workflow.registry)
  );

  if (opts.interactive !== false && isTTY()) {
    workflow.registry.usePromptProvider(
      (definitions: schema.PromptDefinition[]) => {
        const questions: inquirer.QuestionCollection = definitions.map(
          (definition) => {
            const question = {
              name: definition.id,
              message: definition.message,
              default: definition.default as
                | string
                | number
                | boolean
                | string[],
            } as inquirer.Question;

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
                    } else {
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
          }
        );

        return inquirer.prompt(questions);
      }
    );
  }
  return workflow;
}

function isTTY(): boolean {
  return !!process.stdout.isTTY && process.env['CI'] !== 'true';
}
