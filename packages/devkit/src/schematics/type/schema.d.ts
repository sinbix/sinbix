import { ProjectType } from '@nrwl/workspace';

export interface TypeSchematicSchema {
  name: string;
  directory?: string;
  type?: ProjectType;
}
