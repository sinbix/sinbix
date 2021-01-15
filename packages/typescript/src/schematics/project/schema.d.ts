import { ProjectType } from "@sinbix/devkit/src/workspace";

export interface ProjectSchematicSchema {
  name: string;
  tags?: string;
  type?: ProjectType;
  sourceRoot?: string;
}
