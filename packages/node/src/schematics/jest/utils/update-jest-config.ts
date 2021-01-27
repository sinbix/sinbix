import { JestSchematicOptions } from "./models";
import { Rule, Tree } from "@angular-devkit/schematics";
import { getProjectConfig } from "@sinbix/common";
import { addPropertyToJestConfig } from "../../../utils";

export function updateJestConfig(options: JestSchematicOptions): Rule {
  return (host: Tree) => {
    const projectConfig = getProjectConfig(host, options.project);
    addPropertyToJestConfig(
      host,
      'jest.config.js',
      'projects',
      `<rootDir>/${projectConfig.root}`
    );
  };
}
