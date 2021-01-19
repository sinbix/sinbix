import { ProjectType } from "@sinbix/common";

export interface ProjectSchematicSchema {
  name: string;
  tags?: string;
  type?: ProjectType;
  sourceRoot?: string;
}
