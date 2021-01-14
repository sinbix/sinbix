import { ProjectType } from "../../workspace/utils/project-type";

export interface TypeSchematicSchema {
  name: string;
  directory?: string;
  type?: ProjectType;
}
