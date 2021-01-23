import { ProjectType } from "../../workspace";

export interface ProjectSchematicSchema {
  name: string;
  directory?: string;
  type?: ProjectType;
  tags?: string;
  sourceRoot?: string;
}
